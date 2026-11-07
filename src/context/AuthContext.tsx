import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

// Compte de demonstration stocke localement (aucun serveur, aucun mot de passe conserve).
export interface User { name: string; email: string }

const KEY = "emarket_user_v1";

interface AuthValue {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readJSON<User | null>(KEY, null));
  useEffect(() => writeJSON(KEY, user), [user]);

  const value = useMemo<AuthValue>(() => ({ user, login: setUser, logout: () => setUser(null) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
