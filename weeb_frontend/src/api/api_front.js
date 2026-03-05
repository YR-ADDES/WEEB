// ## IMPORTS ##
import axios from "axios";

// ## URL BACKEND (ENV LOCAL / PROD) ##
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

// ✅ routes publiques : pas de token
const routes_sans_token = [
  "utilisateurs/inscription/",
  "utilisateurs/connexion/",
  "login/",
  "token/refresh/",
  "contacts/", // ✅ POST contact public
];

// ## INSTANCE AXIOS ##
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ## INTERCEPTOR TOKEN ##
api.interceptors.request.use(
  (config) => {
    const url = config?.url || "";

    const est_route_publique = routes_sans_token.some((route) =>
      url.startsWith(route)
    );

    if (est_route_publique) {
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
  },
  (error) => Promise.reject(error)
);

export default api;