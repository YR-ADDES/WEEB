// ## IMPORTS REACT ## //
import { useEffect, useState } from "react";

// ## IMPORT ROUTER ## //
import { Link } from "react-router-dom";

// ## IMPORT API ## //
import api from "../api/api_front.js";

// ## PAGE : BLOG (LISTE ARTICLES) ## //
export default function Blog() {
  // ## ETATS ## //
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur_msg, setErreurMsg] = useState("");

  // ## FORMAT DATE ## //
  function formater_date(date_creation) {
    if (!date_creation) return "—";
    const d = new Date(date_creation);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("fr-FR");
  }

  // ## EXTRAIT CONTENU ## //
  function extrait(contenu) {
    const texte = typeof contenu === "string" ? contenu : "";
    if (texte.length <= 260) return texte;
    return `${texte.slice(0, 260)}...`;
  }

  // ## EFFET : CHARGEMENT DES ARTICLES ## //
  useEffect(() => {
    // ## DRAPEAU MONTAGE (EVITE SETSTATE APRES DEMONTAGE) ## //
    let composant_monte = true;

    async function charger_articles() {
      try {
        // ## RESET ETATS ## //
        if (composant_monte) {
          setLoading(true);
          setErreurMsg("");
        }

        // ## APPEL API : LISTE ARTICLES ## //
        const reponse = await api.get("articles/");

        // ## NORMALISATION : ON GARDE UN TABLEAU ## //
        const data = Array.isArray(reponse.data) ? reponse.data : [];

        // ## MISE A JOUR ETAT ## //
        if (composant_monte) {
          setArticles(data);
        }
      } catch {
        // ## MESSAGE ERREUR ## //
        if (composant_monte) {
          setErreurMsg("IMPOSSIBLE DE CHARGER LES ARTICLES.");
        }
      } finally {
        // ## FIN CHARGEMENT ## //
        if (composant_monte) {
          setLoading(false);
        }
      }
    }

    charger_articles();

    // ## CLEANUP ## //
    return () => {
      composant_monte = false;
    };
  }, []);

  // ## RENDU ## //
  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <div className="max-w-6xl mx-auto py-14 px-6">
        {/* ## HEADER ## */}
        <header className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            weeb blog
          </p>

          <div className="w-24 h-[2px] bg-purple-500/60 mx-auto mt-4 rounded-full" />

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase">
            Articles
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Ressources front, back, architecture, bonnes pratiques et performance.
          </p>
        </header>

        {/* ## ETAT : LOADING ## */}
        {loading && (
          <div className="flex justify-center mt-16">
            <div className="bg-[#1A2334] border border-[#2A3550] rounded-2xl px-10 py-8 shadow-md text-center max-w-md w-full">
              <p className="text-gray-300 text-sm uppercase tracking-wider">
                Chargement...
              </p>
            </div>
          </div>
        )}

        {/* ## ETAT : ERREUR ## */}
        {!loading && erreur_msg && (
          <div className="flex justify-center mt-16">
            <div className="bg-[#1A2334] border border-red-500/30 rounded-2xl px-10 py-8 shadow-md text-center max-w-md w-full">
              <p className="text-red-300 text-sm uppercase tracking-wider">
                {erreur_msg}
              </p>
            </div>
          </div>
        )}

        {/* ## ETAT : VIDE ## */}
        {!loading && !erreur_msg && articles.length === 0 && (
          <div className="flex justify-center mt-16">
            <div className="bg-[#1A2334] border border-[#2A3550] rounded-2xl px-10 py-8 shadow-md text-center max-w-md w-full">
              <p className="text-3xl mb-3">📰</p>
              <p className="text-gray-300 text-sm uppercase tracking-wider">
                Aucun article disponible
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Reviens plus tard, de nouveaux contenus arrivent bientôt.
              </p>
            </div>
          </div>
        )}

        {/* ## LISTE ## */}
        {!loading && !erreur_msg && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-[#1A2334] border border-[#2A3550] rounded-2xl shadow-md p-8 hover:border-purple-500/40 hover:shadow-lg transition"
              >
                {/* ## BADGE DATE ## */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                    publié le {formater_date(article?.date_creation)}
                  </span>

                  <span className="text-[11px] uppercase tracking-[0.25em] text-purple-300/80">
                    weeb
                  </span>
                </div>

                {/* ## TITRE ## */}
                <h2 className="text-2xl font-extrabold uppercase text-center leading-snug">
                  <Link
                    to={`/article/${article.id}`}
                    className="hover:text-purple-300 transition"
                  >
                    {article?.titre || "Sans titre"}
                  </Link>
                </h2>

                <div className="w-16 h-[1px] bg-gray-500/40 mx-auto my-6" />

                {/* ## EXTRAIT ## */}
                <p className="text-gray-300 leading-7 text-justify whitespace-pre-line">
                  {extrait(article?.contenu)}
                </p>

                {/* ## CTA ## */}
                <div className="flex justify-end mt-8">
                  <Link
                    to={`/article/${article.id}`}
                    className="text-sm font-bold text-white hover:text-purple-300 hover:underline transition"
                  >
                    Lire l’article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
