// ## IMPORTS ##
import { createContext, useContext } from "react";

// ## CREATION CONTEXTE ##
export const AuthContext = createContext(null);

// ## HOOK ##
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans <AuthProvider />");
  }
  return ctx;
}