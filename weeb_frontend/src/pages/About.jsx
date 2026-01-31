// IMPORT ROUTER //
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-[#0E1729] min-h-screen text-white flex flex-col items-center px-4">

      {/* TITRE + INTRO */}
      <div className="text-center py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          À propos de <span className="uppercase">weeb</span>
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] leading-[160%] text-gray-300 max-w-[850px] mx-auto">
          weeb est un blog conçu pour apprendre, progresser et rester à jour sur le web :
          front-end, back-end, bonnes pratiques, performance et architecture.
        </p>
      </div>

      {/* SECTIONS */}
      <div className="w-full max-w-[1000px] space-y-10 pb-16">

        {/* CARD MISSION */}
        <div className="rounded-[20px] border-2 border-[#C084FC] bg-[#1f223d] bg-opacity-10 shadow-lg p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Notre mission
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed text-[16px] sm:text-[18px]">
            Rendre l’apprentissage du web plus clair et plus pratique.
            Ici, on va droit au but : concepts, exemples, erreurs fréquentes et conseils actionnables.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg">Clarté</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Des explications simples et des exemples concrets, sans blabla.
              </p>
            </div>

            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg">Qualité</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Des articles utiles, structurés et orientés pratique.
              </p>
            </div>

            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg">Progression</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Du débutant au confirmé, avec une vraie logique de montée en compétences.
              </p>
            </div>
          </div>
        </div>

        {/* CARD CTA */}
        <div className="rounded-[20px] border border-white/10 bg-[#1A2334] bg-opacity-50 shadow-lg p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Prêt(e) à explorer ?
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed text-[16px] sm:text-[18px] max-w-[850px] mx-auto">
            Parcourez nos articles et commencez à construire une base web solide.
          </p>

          {/* CTA VERS LE BLOG */}
          <Link
            to="/blog"
            className="inline-block mt-8 bg-[#9333EA] px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Voir les articles
          </Link>
        </div>
      </div>
    </div>
  );
}
