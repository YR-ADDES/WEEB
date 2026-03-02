// ## IMPORTS ##
import { useEffect, useMemo, useState } from "react";
import api from "../api/api_front.js";
import { AuthContext } from "./AuthContext.jsx";

// ## PROVIDER AUTH ##
export default function AuthProvider({ children }) {
  // ## ETATS ##
  const [utilisateur, setUtilisateur] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token_access") || "");
  const [loading_auth, setLoadingAuth] = useState(Boolean(token));

  // ## CHARGER PROFIL SI TOKEN PRESENT (AU REFRESH) ##
  useEffect(() => {
    let mounted = true;

    async function charger_profil() {
      if (!token) {
        if (mounted) {
          setUtilisateur(null);
          setLoadingAuth(false);
        }
        return;
      }

      try {
        const res = await api.get("/api/utilisateurs/me/");
        if (mounted) setUtilisateur(res.data);
      } catch {
        // Token invalide => nettoyage
        localStorage.removeItem("token_access");
        localStorage.removeItem("token_refresh");

        if (mounted) {
          setToken("");
          setUtilisateur(null);
        }
      } finally {
        if (mounted) setLoadingAuth(false);
      }
    }

    charger_profil();

    return () => {
      mounted = false;
    };
  }, [token]);

  // ## FONCTION CONNEXION ##
  async function connexion(email, password) {
    const res = await api.post("/api/utilisateurs/connexion/", { email, password });

    // ## STOCKAGE TOKEN ##
    localStorage.setItem("token_access", res.data.access);
    localStorage.setItem("token_refresh", res.data.refresh);

    // ## MAJ ETATS ##
    setToken(res.data.access);
    setUtilisateur(res.data.utilisateur || null);

    return res.data;
  }

  // ## FONCTION DECONNEXION ##
  function deconnexion() {
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");
    setToken("");
    setUtilisateur(null);
  }

  // ## VALEUR CONTEXTE ##
  const value = useMemo(() => {
    return {
      utilisateur,
      token,
      loading_auth,
      est_connecte: Boolean(token),
      connexion,
      deconnexion,
    };
  }, [utilisateur, token, loading_auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}