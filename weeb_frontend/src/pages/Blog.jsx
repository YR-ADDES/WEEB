// ## IMPORTS REACT ## //
import { useEffect, useState } from "react";

// ## IMPORT ROUTER ## //
import { Link } from "react-router-dom";

// ## IMPORT API ## //
import api from "../api/api_front.js";

// ## IMPORT AUTH ##
import { useAuth } from "../auth/AuthContext.jsx";

// ## PAGE : BLOG (LISTE ARTICLES) ## //
export default function Blog() {
  // ## AUTH ##
  const { token } = useAuth();

  // ## ETATS ## //
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur_msg, setErreurMsg] = useState("");

  // ## MODAL NOUVEL ARTICLE ##
  const [modal_ouvert, setModalOuvert] = useState(false);
  const [titre_new, setTitreNew] = useState("");
  const [contenu_new, setContenuNew] = useState("");
  const [loading_new, setLoadingNew] = useState(false);
  const [erreur_new, setErreurNew] = useState("");

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
    let composant_monte = true;

    async function charger_articles() {
      try {
        if (composant_monte) {
          setLoading(true);
          setErreurMsg("");
        }

        const reponse = await api.get("/api/articles/");
        const data = Array.isArray(reponse.data) ? reponse.data : [];

        if (composant_monte) {
          setArticles(data);
        }
      } catch {
        if (composant_monte) {
          setErreurMsg("IMPOSSIBLE DE CHARGER LES ARTICLES.");
        }
      } finally {
        if (composant_monte) {
          setLoading(false);
        }
      }
    }

    charger_articles();

    return () => {
      composant_monte = false;
    };
  }, []);

  // ## CREER ARTICLE ##
  async function creer_article(e) {
    e.preventDefault();
    setErreurNew("");

    if (!token) {
      setErreurNew("Connexion requise.");
      return;
    }

    setLoadingNew(true);

    try {
      const res = await api.post("/api/articles/", {
        titre: titre_new,
        contenu: contenu_new,
      });

      // Ajout direct en haut
      setArticles((prev) => [res.data, ...prev]);

      // Reset + fermeture
      setTitreNew("");
      setContenuNew("");
      setModalOuvert(false);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setErreurNew("Token invalide / expiré. Reconnecte-toi.");
      } else if (status === 403) {
        setErreurNew("Accès refusé (droits).");
      } else {
        setErreurNew("Erreur création article.");
      }
    } finally {
      setLoadingNew(false);
    }
  }

  // ## OUVRIR MODAL ##
  function ouvrir_modal() {
    setErreurNew("");
    setModalOuvert(true);
  }

  // ## FERMER MODAL ##
  function fermer_modal() {
    setErreurNew("");
    setModalOuvert(false);
  }

  // ## RENDU ## //
  return (
    <div className="bg-[#0E1729] min-h-screen text-white">
      <div className="max-w-6xl mx-auto py-14 px-6">
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
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

          {/* ## BOUTON NOUVEL ARTICLE (CONNECTÉ) ## */}
          {token && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={ouvrir_modal}
                className="px-6 py-3 rounded-2xl bg-purple-600/90 hover:bg-purple-600 transition font-semibold"
              >
                + Nouvel article
              </button>
            </div>
          )}
        </header>

        {/* ========================= */}
        {/* ETAT : LOADING */}
        {/* ========================= */}
        {loading && (
          <div className="flex justify-center mt-16">
            <div className="bg-[#1A2334] border border-[#2A3550] rounded-2xl px-10 py-8 shadow-md text-center max-w-md w-full">
              <p className="text-gray-300 text-sm uppercase tracking-wider">
                Chargement...
              </p>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* ETAT : ERREUR */}
        {/* ========================= */}
        {!loading && erreur_msg && (
          <div className="flex justify-center mt-16">
            <div className="bg-[#1A2334] border border-red-500/30 rounded-2xl px-10 py-8 shadow-md text-center max-w-md w-full">
              <p className="text-red-300 text-sm uppercase tracking-wider">
                {erreur_msg}
              </p>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* ETAT : VIDE */}
        {/* ========================= */}
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

        {/* ========================= */}
        {/* LISTE */}
        {/* ========================= */}
        {!loading && !erreur_msg && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-[#1A2334] border border-[#2A3550] rounded-2xl shadow-md p-8 hover:border-purple-500/40 hover:shadow-lg transition flex flex-col min-h-[360px]"
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
                <div className="mt-auto pt-6 flex justify-end">
                  <Link
                    to={`/article/${article.id}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition hover:text-purple-200"
                  >
                    <span>Lire l’article</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ========================= */}
        {/* MODAL : NOUVEL ARTICLE */}
        {/* ========================= */}
        {modal_ouvert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={fermer_modal}
            />

            {/* modal */}
            <div className="relative w-full max-w-2xl bg-[#1A2334] border border-[#2A3550] rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold uppercase">Nouvel article</h2>
                <button
                  onClick={fermer_modal}
                  className="text-gray-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {erreur_new ? (
                <p className="text-red-300 text-sm mb-4">{erreur_new}</p>
              ) : null}

              <form onSubmit={creer_article} className="space-y-4">
                <input
                  className="w-full bg-transparent border border-[#2A3550] rounded-xl px-4 py-3 outline-none"
                  placeholder="Titre"
                  value={titre_new}
                  onChange={(e) => setTitreNew(e.target.value)}
                  required
                />

                <textarea
                  className="w-full min-h-[200px] bg-transparent border border-[#2A3550] rounded-xl px-4 py-3 outline-none"
                  placeholder="Contenu"
                  value={contenu_new}
                  onChange={(e) => setContenuNew(e.target.value)}
                  required
                />

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={fermer_modal}
                    className="px-5 py-3 rounded-2xl border border-[#2A3550] hover:border-purple-400/60 transition"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={loading_new}
                    className="px-5 py-3 rounded-2xl bg-purple-600/90 hover:bg-purple-600 transition font-semibold disabled:opacity-60"
                  >
                    {loading_new ? "Création..." : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}