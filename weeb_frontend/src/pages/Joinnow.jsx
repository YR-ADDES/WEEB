import { Link } from "react-router-dom";

export default function Joinnow() {
  return (
    <div className="bg-[#0E1729] min-h-screen text-white flex flex-col items-center px-4">

      {/* TITRE + TEXTE INTRO */}
      <div className="text-center py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Rejoindre <span className="uppercase">weeb</span> ! 
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] leading-[160%] text-gray-300 max-w-[850px] mx-auto">
          Créez votre compte pour accéder à du contenu exclusif, enregistrer vos articles favoris,
          et recevoir nos ressources directement dans votre boîte mail.
        </p>
      </div>

      {/* CARD INSCRIPTION */}
      <div className="w-full max-w-[900px] mb-12">
        <div className="rounded-[20px] border-2 border-[#C084FC] bg-[#1f223d] bg-opacity-10 shadow-lg p-8 sm:p-10">

          {/* BLOCS INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BLOC 1 */}
            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold">Accès premium</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Débloquez des guides, checklists et templates orientés dev & bonnes pratiques.
              </p>
            </div>

            {/* BLOC 2 */}
            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold">Newsletter</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Recevez chaque semaine un résumé des tendances et ressources essentielles.
              </p>
            </div>

            {/* BLOC 3 */}
            <div className="bg-[#1A2334] bg-opacity-60 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold">Favoris</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Enregistrez vos articles et retrouvez-les facilement quand vous voulez.
              </p>
            </div>
          </div>

          {/* FORMULAIRE */}
          <form className="mt-10 w-full max-w-[642px] mx-auto flex flex-col gap-6">

            {/* NOM + PRENOM */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="w-full sm:w-1/2 h-[48px] bg-transparent placeholder-[#C084FC] text-white py-2 border-b border-[#C084FC] focus:outline-none text-center"
                type="text"
                placeholder="Nom"
              />
              <input
                className="w-full sm:w-1/2 h-[48px] bg-transparent placeholder-[#C084FC] text-white py-2 border-b border-[#C084FC] focus:outline-none text-center"
                type="text"
                placeholder="Prénom"
              />
            </div>

            {/* EMAIL */}
            <div className="w-full h-[48px] flex items-center border-b border-[#C084FC]">
              <input
                className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="w-full h-[48px] flex items-center border-b border-[#C084FC]">
              <input
                className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
                type="password"
                placeholder="Mot de passe"
                required
              />
            </div>

            {/* PASSWORD CONFIRM */}
            <div className="w-full h-[48px] flex items-center border-b border-[#C084FC]">
              <input
                className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
                type="password"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="bg-[#9333EA] w-full h-[52px] rounded-[10px] border border-[#9333EA] hover:bg-purple-700 transition font-semibold"
            >
              Créer mon compte
            </button>

            {/* LIEN LOGIN */}
            <p className="text-center text-gray-300">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-white font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
