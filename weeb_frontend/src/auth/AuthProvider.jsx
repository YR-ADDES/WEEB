// ## IMPORTS ##
import { useMemo, useState } from "react";
import api from "../api/api_front.js";
import { AuthContext } from "./AuthContext.jsx";

// ## PROVIDER AUTH ##
export default function AuthProvider({ children }) {
  // ## ETATS ##
  const [utilisateur, setUtilisateur] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token_access") || "");

  // ## FONCTION CONNEXION ##
  async function connexion(email, password) {
    // ## APPEL BACKEND ##
    const res = await api.post("/api/utilisateurs/connexion/", {
      email,
      password,
    });

    // ## STOCKAGE TOKEN ##
    localStorage.setItem("token_access", res.data.access);
    localStorage.setItem("token_refresh", res.data.refresh);

    // ## MAJ ETATS ##
    setToken(res.data.access);
    setUtilisateur(res.data.utilisateur);

    return res.data;
  }

  // ## FONCTION DECONNEXION ##
  function deconnexion() {
    // ## SUPPRESSION STORAGE ##
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");

    // ## RESET ETATS ##
    setToken("");
    setUtilisateur(null);
  }

  // ## VALEUR CONTEXTE ##
  const value = useMemo(() => {
    return {
      utilisateur,
      token,
      est_connecte: Boolean(token),
      connexion,
      deconnexion,
    };
  }, [utilisateur, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
