// ## IMPORTS ##
import axios from "axios";

// ## URL BACKEND (ENV LOCAL / PROD) ##
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ## ROUTES PUBLIQUES : PAS DE TOKEN ##
const routes_sans_token = ["/api/token/", "/api/token/refresh/", "/api/joinnow/"];

// ## INSTANCE AXIOS ##
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ## INTERCEPTOR TOKEN ##
api.interceptors.request.use(
  (config) => {
    // ## URL DEMANDEE ##
    const url = config?.url || "";

    // ## SI ROUTE PUBLIQUE => PAS DE TOKEN ##
    const est_route_publique = routes_sans_token.some((route) => url.startsWith(route));
    if (est_route_publique) {
      if (config?.headers?.Authorization) delete config.headers.Authorization;
      return config;
    }

    // ## RECUP TOKEN ##
    const token = localStorage.getItem("token_access");

    // ## AJOUT HEADER UNIQUEMENT SI TOKEN VALIDE ##
    if (token && typeof token === "string" && token.trim().length > 10) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // ## SUPPRESSION HEADER SI PAS DE TOKEN ##
      if (config?.headers?.Authorization) {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ## INTERCEPTOR RESPONSE : 401 => NETTOYAGE TOKEN ##
api.interceptors.request.use((config) => {
  // ## URL ##
  const url = config?.url || "";

  // ✅ NE PAS ENVOYER TOKEN SUR INSCRIPTION/CONNEXION ##
  const routes_publiques = [
    "/api/utilisateurs/inscription/",
    "/api/utilisateurs/connexion/",
  ];

  const est_publique = routes_publiques.some((r) => url.startsWith(r));

  if (est_publique) {
    if (config?.headers?.Authorization) delete config.headers.Authorization;
    return config;
  }

  const token = localStorage.getItem("token_access");

  if (token && typeof token === "string" && token.trim().length > 10) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (config?.headers?.Authorization) delete config.headers.Authorization;
  }

  return config;
});

export default api;