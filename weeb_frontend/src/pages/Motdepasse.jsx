// IMPORTS //
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Motdepasse() {
  const [sent, setSent] = useState(false);

  // SIMULATION ENVOI EMAIL (API A BRANCHER PLUS TARD)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#0E1729] min-h-[580px] text-white flex flex-col items-center px-4">

      {/* TITRE */}
      <div className="text-center py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Mot de passe oublié ?
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] leading-[160%] text-gray-300 max-w-[850px] mx-auto">
          Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-[700px] mb-12">
        <div className="rounded-[20px] border-2 border-[#C084FC] bg-[#1f223d] bg-opacity-10 shadow-lg p-8 sm:p-10">

          {!sent ? (
            <>
              {/* FORMULAIRE */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

                {/* EMAIL */}
                <div className="w-full h-[48px] flex items-center border-b border-[#C084FC]">
                  <input
                    className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* BOUTON */}
                <button
                  type="submit"
                  className="bg-[#9333EA] w-full h-[52px] rounded-[10px] border border-[#9333EA] hover:bg-purple-700 transition font-semibold"
                >
                  Envoyer le lien
                </button>

                {/* RETOUR LOGIN */}
                <p className="text-center text-gray-300">
                  Vous vous souvenez de votre mot de passe ?{" "}
                  <Link to="/login" className="text-white font-bold hover:underline">
                    Se connecter
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <>
              {/* SUCCÈS */}
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  Email envoyé ✅
                </h2>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  Si un compte existe avec cet email, vous recevrez un lien de réinitialisation sous quelques minutes.
                </p>

                <Link
                  to="/login"
                  className="inline-block mt-8 bg-[#9333EA] px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Retour à la connexion
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
