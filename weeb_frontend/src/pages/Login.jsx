// IMPORTS REACT ROUTER // 
import { Link } from "react-router-dom";

// PAGE LOGIN //  
export default function Login() {
  return (
    <div className="max-h-[1440px] text-white flex flex-col items-center px-4">

      {/* TITRE */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-extrabold">
          Se connecter
        </h1>
      </div>

      {/* FORMULAIRE */}
      <form className="w-full max-w-[642px] flex flex-col items-center">

        {/* CHAMP EMAIL */}
        <div className="w-full h-[41px] flex items-center border-b border-[#C084FC] mb-10">
          <input
            className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
        </div>

        {/* CHAMP MOT DE PASSE */}
        <div className="w-full h-[41px] flex items-center border-b border-[#C084FC] mb-10">
          <input
            className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
            type="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
          />
        </div>

        {/* LIEN MOT DE PASSE OUBLIÉ */}
        <div className="w-full text-center mb-1">
          <Link
            to="/motdepasse"
            className="text-white font-extrabold hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* BOUTON SE CONNECTER */}
        <div className="text-center py-16">
          <button
            type="submit"
            className="bg-[#9333EA] w-full sm:w-[210px] h-[48px] p-[12px] rounded-[8px] border border-[#9333EA] hover:bg-purple-700 text-white transition duration-300"
          >
            Se connecter
          </button>
        </div>

        {/* LIEN CRÉER UN COMPTE */}
        <div className="text-center mt-10 mb-10 sm:mb-[10%]">
          <p className="text-[#C4C4C4] text-sm sm:text-base">
            Vous n’avez pas de compte ?{" "}
            <Link to="/joinnow">
              Vous pouvez en{" "}
              <span className="text-white font-extrabold border-b-2 sm:border-b-[3px] py-1 sm:py-3 border-white">
                créer un !
              </span>
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}
