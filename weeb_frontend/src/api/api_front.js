// ## IMPORTS ##
import axios from "axios";

// ## INSTANCE AXIOS ##
const api = axios.create({
  // ## URL BACKEND DJANGO ##
  baseURL: "http://127.0.0.1:8000",

  // ## HEADERS JSON ##
  headers: {
    "Content-Type": "application/json",
  },
});

// ## INTERCEPTOR TOKEN ##
api.interceptors.request.use(
  (config) => {
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
  (error) => {
    // ## ERREUR INTERCEPTOR ##
    return Promise.reject(error);
  }
);

// ## INTERCEPTOR RESPONSE : 401 => NETTOYAGE TOKEN ##
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ## TOKEN INVALIDE / EXPIRE ##
    if (error?.response?.status === 401) {
      localStorage.removeItem("token_access");
      localStorage.removeItem("token_refresh");
    }
    return Promise.reject(error);
  }
);

export default api;
