import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name?: string } | null;
  signIn: (email: string) => void;
  signUp: (email: string, name: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("nested_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      sessionStorage.removeItem("nested_auth_user");
    }
  }, []);

  const signIn = (email: string) => {
    const u = { email };
    setUser(u);
    sessionStorage.setItem("nested_auth_user", JSON.stringify(u));
  };

  const signUp = (email: string, name: string) => {
    const u = { email, name };
    setUser(u);
    sessionStorage.setItem("nested_auth_user", JSON.stringify(u));
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem("nested_auth_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
