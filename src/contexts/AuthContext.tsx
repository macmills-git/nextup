import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type UserRole = "admin" | "organizer" | "vendor";
// Legacy compat: some existing pages import "planner"; we alias it to organizer.
export type LegacyRole = UserRole | "planner";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: UserRole;
  vendorOnboarded?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: AuthUser | null;
  session: Session | null;
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithPassword: (email: string, password: string, name: string, role: UserRole) => Promise<{ error?: string }>;
  signInWithGoogle: (role?: UserRole) => Promise<{ error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loadProfile(user: User): Promise<AuthUser> {
  const [{ data: roles }, { data: profile }, { data: vendor }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id),
    supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle(),
    supabase.from("vendor_profiles").select("onboarded").eq("user_id", user.id).maybeSingle(),
  ]);
  const rawRole = (roles?.[0]?.role as UserRole | undefined) ?? "organizer";
  return {
    id: user.id,
    email: user.email ?? "",
    name: profile?.full_name ?? (user.user_metadata as { full_name?: string } | null)?.full_name ?? user.email?.split("@")[0],
    avatarUrl: profile?.avatar_url ?? undefined,
    role: rawRole,
    vendorOnboarded: vendor?.onboarded ?? false,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async (s: Session | null) => {
    if (!s?.user) {
      setUser(null);
      return;
    }
    try {
      const u = await loadProfile(s.user);
      setUser(u);
    } catch (e) {
      console.error("hydrate profile failed", e);
      setUser({ id: s.user.id, email: s.user.email ?? "", role: "organizer" });
    }
  }, []);

  useEffect(() => {
    // 1. Subscribe first
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      // defer profile fetch to avoid deadlock
      setTimeout(() => hydrate(s), 0);
    });

    // 2. Then read existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      hydrate(data.session).finally(() => setLoading(false));
    });

    return () => sub.subscription.unsubscribe();
  }, [hydrate]);

  const signInWithPassword: AuthContextType["signInWithPassword"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const signUpWithPassword: AuthContextType["signUpWithPassword"] = async (email, password, name, role) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name, role },
      },
    });
    if (error) return { error: error.message };
    return {};
  };

  const signInWithGoogle: AuthContextType["signInWithGoogle"] = async (role) => {
    try {
      if (role) sessionStorage.setItem("nested_intended_role", role);
      const { lovable } = await import("@/integrations/lovable/index");
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) return { error: (result.error as Error).message ?? "Google sign-in failed" };
      return {};
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Google sign-in failed" };
    }
  };

  const sendPasswordReset: AuthContextType["sendPasswordReset"] = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUser = (patch: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const refresh = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    await hydrate(data.session);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        loading,
        user,
        session,
        signInWithPassword,
        signUpWithPassword,
        signInWithGoogle,
        sendPasswordReset,
        signOut,
        updateUser,
        refresh,
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
