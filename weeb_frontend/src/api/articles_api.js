// ## IMPORT AXIOS INSTANCE ##
import api from "./api_front.js";

// ## CREER ARTICLE (auteur auto côté backend) ##
export async function creer_article(payload) {
  // payload = { titre, contenu }
  const res = await api.post("/api/articles/", payload);
  return res.data;
}

// ## MODIFIER ARTICLE ##
export async function modifier_article(id, payload) {
  // payload = { titre, contenu }
  const res = await api.patch(`/api/articles/${id}/`, payload);
  return res.data;
}

// ## SUPPRIMER ARTICLE ##
export async function supprimer_article(id) {
  const res = await api.delete(`/api/articles/${id}/`);
  return res.data;
}