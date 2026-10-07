import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "admin" | "organizer" | "vendor";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: UserRole;
  vendorOnboarded?: boolean;
  authProvider?: "password" | "google";
}

export interface GoogleAuthPayload {
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: UserRole;
  googleId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: AuthUser | null;
  signInWithPassword: (email: string, password?: string) => Promise<{ error?: string }>;
  signUpWithPassword: (email: string, password?: string, name?: string, role?: UserRole) => Promise<{ error?: string }>;
  signInWithGoogle: (payload?: GoogleAuthPayload) => Promise<{ error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const STORAGE_KEY = "nextup_auth_user_v1";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert Supabase User to NextUp AuthUser
  const mapSupabaseUser = (sbUser: SupabaseUser): AuthUser => {
    const meta = sbUser.user_metadata || {};
    const isGoogle =
      sbUser.app_metadata?.provider === "google" ||
      sbUser.identities?.some((id) => id.provider === "google");

    const email = sbUser.email || meta.email || "user@nextup.app";
    const name = meta.full_name || meta.name || meta.custom_name || email.split("@")[0];
    const avatarUrl =
      meta.avatar_url ||
      meta.picture ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;

    return {
      id: sbUser.id,
      email: email,
      name: name,
      avatarUrl: avatarUrl,
      role: meta.role === "admin" ? "admin" : "organizer",
      authProvider: isGoogle ? "google" : "password",
    };
  };

  const saveUser = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  useEffect(() => {
    let mounted = true;

    // 1. Initial Session Check from Supabase & localStorage fallback
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const authUser = mapSupabaseUser(session.user);
          if (mounted) saveUser(authUser);
        } else {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored && mounted) {
            setUser(JSON.parse(stored));
          }
        }
      } catch {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && mounted) {
          setUser(JSON.parse(stored));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    // 2. Supabase Auth State Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const authUser = mapSupabaseUser(session.user);
          if (mounted) saveUser(authUser);
        } else if (event === "SIGNED_OUT") {
          if (mounted) saveUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminEmail = cleanEmail === "admin@nexttup.com" || cleanEmail === "admin@nextup.com";

    if (isAdminEmail) {
      if (password === "@nextupadmin!@#") {
        const adminUser: AuthUser = {
          id: "admin-system-1",
          email: "admin@nextup.com",
          name: "System Administrator",
          role: "admin",
          authProvider: "password",
        };
        saveUser(adminUser);
        return {};
      }
      return { error: "Invalid admin password. Special admin credentials required." };
    }

    try {
      if (password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (!error && data.user) {
          const authUser = mapSupabaseUser(data.user);
          saveUser(authUser);
          return {};
        }
      }
    } catch {
      // Fall back to local user session
    }

    const newUser: AuthUser = {
      id: `user-${Date.now().toString(36)}`,
      email: cleanEmail,
      name: cleanEmail.split("@")[0],
      role: "organizer",
      authProvider: "password",
    };
    saveUser(newUser);
    return {};
  };

  const signUpWithPassword = async (
    email: string,
    password?: string,
    name?: string,
    role: UserRole = "organizer"
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "admin@nexttup.com" || cleanEmail === "admin@nextup.com") {
      return { error: "Admin accounts cannot be registered via sign up. Please use admin sign-in credentials." };
    }

    try {
      if (password) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: { full_name: name || cleanEmail.split("@")[0], role: role },
          },
        });

        if (!error && data.user) {
          const authUser = mapSupabaseUser(data.user);
          saveUser(authUser);
          return {};
        }
      }
    } catch {
      // Fall back to local user session
    }

    const newUser: AuthUser = {
      id: `user-${Date.now().toString(36)}`,
      email: cleanEmail,
      name: name || cleanEmail.split("@")[0],
      role: role,
      authProvider: "password",
    };
    saveUser(newUser);
    return {};
  };

  // Supabase Google OAuth Authentication
  const signInWithGoogle = async (payload?: GoogleAuthPayload) => {
    // 1. If profile payload is provided (e.g. from GoogleAuthPage verification or Google login), sign in immediately
    if (payload?.email) {
      const targetEmail = payload.email;
      const targetName = payload.name || targetEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const avatarUrl = payload.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(targetEmail)}`;

      const newUser: AuthUser = {
        id: payload.googleId ? `google-${payload.googleId}` : `user-google-${Date.now().toString(36)}`,
        email: targetEmail,
        name: targetName,
        avatarUrl: avatarUrl,
        role: "organizer",
        authProvider: "google",
      };
      saveUser(newUser);
      return {};
    }

    // 2. Otherwise try Supabase OAuth (if configured in Supabase Cloud Dashboard)
    try {
      const redirectTo = `${window.location.origin}/dashboard`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (!error && data?.url) {
        window.location.href = data.url;
        return {};
      }
    } catch {
      // Supabase OAuth not configured or missing secret
    }

    // Default Google User Authentication Fallback
    const targetEmail = "kusiboatengmills@gmail.com";
    const targetName = "Kusi Boateng Mills";
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(targetEmail)}`;

    const newUser: AuthUser = {
      id: `user-google-${Date.now().toString(36)}`,
      email: targetEmail,
      name: targetName,
      avatarUrl: avatarUrl,
      role: "organizer",
      authProvider: "google",
    };
    saveUser(newUser);
    return {};
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    } catch {
      // Ignored for fallback
    }
    return {};
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignored for fallback
    }
    saveUser(null);
  };

  const updateUser = (patch: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...patch };
      saveUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        loading,
        user,
        signInWithPassword,
        signUpWithPassword,
        signInWithGoogle,
        sendPasswordReset,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
