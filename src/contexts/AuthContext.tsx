import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "organizer" | "vendor";

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
  signInWithPassword: (email: string, password?: string) => Promise<{ error?: string }>;
  signUpWithPassword: (email: string, password?: string, name?: string, role?: UserRole) => Promise<{ error?: string }>;
  signInWithGoogle: (role?: UserRole) => Promise<{ error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const STORAGE_KEY = "nextup_auth_user_v1";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Seed default logged-in demo user
        const defaultUser: AuthUser = {
          id: "user-organizer-1",
          email: "alex@nextup.app",
          name: "Alex Mensah",
          role: "organizer",
        };
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUser = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

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
        };
        saveUser(adminUser);
        return {};
      }
      return { error: "Invalid admin password. Special admin credentials required." };
    }

    const newUser: AuthUser = {
      id: `user-${Date.now().toString(36)}`,
      email,
      name: email.split("@")[0],
      role: "organizer",
    };
    saveUser(newUser);
    return {};
  };

  const signUpWithPassword = async (email: string, _password?: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === "admin@nexttup.com" || cleanEmail === "admin@nextup.com") {
      return { error: "Admin accounts cannot be registered via sign up. Please use admin sign-in credentials." };
    }
    const newUser: AuthUser = {
      id: `user-${Date.now().toString(36)}`,
      email,
      name: name || email.split("@")[0],
      role: "organizer",
    };
    saveUser(newUser);
    return {};
  };

  const signInWithGoogle = async () => {
    const newUser: AuthUser = {
      id: `user-google-${Date.now().toString(36)}`,
      email: "google.user@example.com",
      name: "Google User",
      role: "organizer",
    };
    saveUser(newUser);
    return {};
  };

  const sendPasswordReset = async (_email: string) => {
    return {};
  };

  const signOut = async () => {
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
