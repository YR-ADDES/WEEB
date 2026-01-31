// IMPORT AXIOS //
import axios from "axios";

// INSTANCE AXIOS CONFIGURÉE //
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// EXPORT PAR DÉFAUT //
export default api;
