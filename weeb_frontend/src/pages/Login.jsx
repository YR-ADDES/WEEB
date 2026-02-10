// ## IMPORTS ##
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api_front.js";
import { AuthContext } from "../auth/AuthContext.jsx";

// ## PAGE LOGIN ##
export default function Login() {
  // ## CONTEXTE ##
  const auth = useContext(AuthContext);

  // ## NAVIGATION ##
  const navigate = useNavigate();

  // ## ETATS FORM ##
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ## ETATS UI ##
  const [message_erreur, setMessage_erreur] = useState("");
  const [loading, setLoading] = useState(false);

  // ## SUBMIT CONNEXION ##
  async function gerer_connexion(e) {
    // ## STOP RELOAD ##
    e.preventDefault();

    // ## RESET ##
    setMessage_erreur("");
    setLoading(true);

    try {
      // ## APPEL API CONNEXION ##
      const res = await api.post("/api/utilisateurs/connexion/", {
        email,
        password,
      });

      // ## STOCKAGE TOKENS ##
      localStorage.setItem("token_access", res.data.access);
      localStorage.setItem("token_refresh", res.data.refresh);

      // ## STOCKAGE UTILISATEUR (OPTIONNEL) ##
      if (auth && auth.setUtilisateur) {
        auth.setUtilisateur(res.data.utilisateur);
      }

      // ## REDIRECTION ##
      navigate("/blog");
    } catch (err) {
      // ## MESSAGE ERREUR ##
      const msg =
        err?.response?.data?.message ||
        "Erreur lors de la connexion. Vérifie tes identifiants.";

      setMessage_erreur(msg);
    } finally {
      // ## STOP LOADING ##
      setLoading(false);
    }
  }

  return (
    <div className="max-h-[1440px] text-white flex flex-col items-center px-4">
      {/* ## TITRE ## */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-extrabold">Se connecter</h1>
      </div>

      {/* ## MESSAGE ERREUR ## */}
      {message_erreur ? (
        <div className="w-full max-w-[642px] text-center mb-8">
          <p className="text-red-300 font-semibold">{message_erreur}</p>
        </div>
      ) : null}

      {/* ## FORMULAIRE ## */}
      <form
        onSubmit={gerer_connexion}
        className="w-full max-w-[642px] flex flex-col items-center"
      >
        {/* ## CHAMP EMAIL ## */}
        <div className="w-full h-[41px] flex items-center border-b border-[#C084FC] mb-10">
          <input
            className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* ## CHAMP MOT DE PASSE ## */}
        <div className="w-full h-[41px] flex items-center border-b border-[#C084FC] mb-10">
          <input
            className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
            type="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ## LIEN MOT DE PASSE OUBLIE ## */}
        <div className="w-full text-center mb-1">
          <Link to="/motdepasse" className="text-white font-extrabold hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* ## BOUTON SE CONNECTER ## */}
        <div className="text-center py-16">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#9333EA] w-full sm:w-[210px] h-[48px] p-[12px] rounded-[8px] border border-[#9333EA] hover:bg-purple-700 text-white transition duration-300 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>

        {/* ## LIEN CREER UN COMPTE ## */}
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
