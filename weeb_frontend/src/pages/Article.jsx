// ## IMPORTS REACT ## //
import { useEffect, useState } from "react";

// ## IMPORT ROUTER ## //
import { useParams, Link } from "react-router-dom";

// ## IMPORT API ## //
import api from "../api/api_front.js";

// ## PAGE : DETAIL ARTICLE ## //
export default function Article() {
  // ## PARAM ID ## //
  const { id } = useParams();

  // ## ETATS ## //
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  // ## FORMAT DATE ## //
  function formater_date(date_creation) {
    if (!date_creation) return "—";
    const d = new Date(date_creation);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("fr-FR");
  }

  // ## EFFET : CHARGEMENT ARTICLE ## //
  useEffect(() => {
    let composant_monte = true;

    async function charger_article() {
      try {
        // ## RESET ## //
        if (composant_monte) {
          setLoading(true);
          setErreur("");
        }

        // ## APPEL API : DETAIL ## //
        const reponse = await api.get(`articles/${id}/`);

        // ## SET ARTICLE ## //
        if (composant_monte) {
          setArticle(reponse.data);
        }
      } catch (err) {
        // ## CAS 404 ## //
        if (composant_monte) {
          if (err?.response?.status === 404) {
            setErreur("ARTICLE INTROUVABLE");
          } else {
            setErreur("ERREUR LORS DU CHARGEMENT");
          }
        }
      } finally {
        // ## FIN CHARGEMENT ## //
        if (composant_monte) {
          setLoading(false);
        }
      }
    }

    charger_article();

    return () => {
      composant_monte = false;
    };
  }, [id]);

  // ## ETAT : LOADING ## //
  if (loading) {
    return (
      <div className="bg-[#0E1729] min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  // ## ETAT : ERREUR ## //
  if (erreur) {
    return (
      <div className="bg-[#0E1729] min-h-screen text-white flex items-center justify-center text-red-400">
        {erreur}
      </div>
    );
  }

  // ## SECURITE ## //
  if (!article) return null;

  // ## CHAMPS BACKEND ## //
  const titre = article?.titre || "Sans titre";
  const contenu = typeof article?.contenu === "string" ? article.contenu : "";
  const date_creation = article?.date_creation;

  // ## RENDU ## //
  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* ## RETOUR ## */}
        <Link
          to="/blog"
          className="text-sm text-purple-400 hover:underline mb-6 inline-block"
        >
          ← Retour aux articles
        </Link>

        {/* ## TITRE ## */}
        <h1 className="text-4xl font-extrabold mb-4 text-center uppercase">
          {titre}
        </h1>

        {/* ## DATE ## */}
        <p className="text-sm text-gray-400 text-center mb-8 uppercase tracking-wider">
          Publié le {formater_date(date_creation)}
        </p>

        {/* ## CONTENU ## */}
        <div className="bg-[#1A2334] border border-[#2A3550] rounded-2xl p-8 shadow-md">
          <p className="text-gray-300 leading-7 whitespace-pre-line text-justify">
            {contenu}
          </p>
        </div>
      </div>
    </div>
  );
}
