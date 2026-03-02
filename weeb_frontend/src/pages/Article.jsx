// ## IMPORTS REACT ## //
import { useCallback, useEffect, useMemo, useState } from "react";

// ## IMPORT ROUTER ## //
import { useParams, Link, useNavigate } from "react-router-dom";

// ## IMPORT API ## //
import api from "../api/api_front.js";

// ## IMPORT AUTH ##
import { useAuth } from "../auth/AuthContext.jsx";

// ## PAGE : DETAIL ARTICLE ## //
export default function Article() {
  // ## PARAMS / NAV ##
  const { id } = useParams();
  const navigate = useNavigate();

  // ## AUTH ##
  const { token, utilisateur } = useAuth();

  // ## ETATS ##
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  // ## MODAL ##
  const [modal_open, setModalOpen] = useState(false);
  const [edit_titre, setEditTitre] = useState("");
  const [edit_contenu, setEditContenu] = useState("");

  // ## FORMAT DATE ##
  function formater_date(date_creation) {
    if (!date_creation) return "—";
    const d = new Date(date_creation);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("fr-FR");
  }

  // ## CHARGER ARTICLE (STABLE) ##
  const charger_article = useCallback(async () => {
    try {
      setLoading(true);
      setErreur("");

      const reponse = await api.get(`/api/articles/${id}/`);
      setArticle(reponse.data);
    } catch (err) {
      if (err?.response?.status === 404) setErreur("ARTICLE INTROUVABLE");
      else setErreur("ERREUR LORS DU CHARGEMENT");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ## EFFET : CHARGEMENT ##
  useEffect(() => {
    charger_article();
  }, [charger_article]);

  // ## EST AUTEUR ##
  const est_auteur = useMemo(() => {
    return Boolean(token) && Number(utilisateur?.id) === Number(article?.auteur);
  }, [token, utilisateur?.id, article?.auteur]);

  // ## SUPPRESSION ##
  async function gerer_suppression() {
    if (!est_auteur) return;

    const confirmer = window.confirm("Confirmer la suppression ?");
    if (!confirmer) return;

    try {
      await api.delete(`/api/articles/${id}/`);
      navigate("/blog");
    } catch {
      alert("Erreur lors de la suppression.");
    }
  }

  // ## OUVRIR MODAL ##
  function ouvrir_modal() {
    setEditTitre(article?.titre || "");
    setEditContenu(article?.contenu || "");
    setModalOpen(true);
  }

  // ## SAUVEGARDER MODIF ##
  async function sauvegarder_modif() {
    try {
      await api.patch(`/api/articles/${id}/`, {
        titre: edit_titre,
        contenu: edit_contenu,
      });

      setModalOpen(false);
      charger_article(); // refresh
    } catch {
      alert("Erreur lors de la modification.");
    }
  }

  // ## ETATS UI ##
  if (loading) {
    return (
      <div className="bg-[#0E1729] min-h-screen text-white flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="bg-[#0E1729] min-h-screen flex items-center justify-center text-red-400">
        {erreur}
      </div>
    );
  }

  if (!article) return null;

  // ## RENDU ##
  return (
    <div className="bg-[#0E1729] min-h-screen text-white relative">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Link
          to="/blog"
          className="text-sm text-purple-400 hover:underline mb-6 inline-block"
        >
          ← Retour aux articles
        </Link>

        <h1 className="text-4xl font-extrabold mb-3 text-center uppercase">
          {article.titre}
        </h1>

        <p className="text-center text-sm text-gray-400 mb-8">
          Publié le {formater_date(article.date_creation)}
        </p>

        <div className="bg-[#1A2334] border border-[#2A3550] rounded-2xl p-8 shadow-md">
          <p className="text-gray-300 whitespace-pre-line text-justify">
            {article.contenu}
          </p>
        </div>

        {/* ## ACTIONS AUTEUR ## */}
        {est_auteur && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={ouvrir_modal}
              className="px-5 py-3 rounded-2xl border border-purple-500/40 hover:bg-purple-500/10 transition"
            >
              Modifier
            </button>

            <button
              onClick={gerer_suppression}
              className="px-5 py-3 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-200"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* ## MODAL MODIFICATION ## */}
      {modal_open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1A2334] p-8 rounded-2xl w-full max-w-xl border border-[#2A3550]">
            <h2 className="text-xl font-bold mb-6 uppercase text-center">
              Modifier l'article
            </h2>

            <input
              className="w-full mb-4 p-3 bg-[#0E1729] border border-[#2A3550] rounded-xl outline-none"
              value={edit_titre}
              onChange={(e) => setEditTitre(e.target.value)}
            />

            <textarea
              rows={6}
              className="w-full mb-6 p-3 bg-[#0E1729] border border-[#2A3550] rounded-xl outline-none"
              value={edit_contenu}
              onChange={(e) => setEditContenu(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-500/30 rounded-xl"
              >
                Annuler
              </button>

              <button
                onClick={sauvegarder_modif}
                className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}