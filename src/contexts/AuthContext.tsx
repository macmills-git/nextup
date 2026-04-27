import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "planner" | "vendor";

export interface AuthUser {
  email: string;
  name?: string;
  role: UserRole;
  vendorOnboarded?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  signIn: (email: string, role?: UserRole) => void;
  signUp: (email: string, name: string, role?: UserRole) => void;
  signOut: () => void;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "nested_auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // backwards compat: default role to planner if missing
        if (!parsed.role) parsed.role = "planner";
        setUser(parsed);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else sessionStorage.removeItem(STORAGE_KEY);
  };

  const signIn = (email: string, role: UserRole = "planner") => {
    persist({ email, role });
  };

  const signUp = (email: string, name: string, role: UserRole = "planner") => {
    persist({ email, name, role, vendorOnboarded: false });
  };

  const signOut = () => persist(null);

  const updateUser = (patch: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
