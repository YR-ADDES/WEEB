// IMPORTS //
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navigation() {

  // ROUTE ACTIVE //
  const { pathname } = useLocation();

  // ETAT MENU MOBILE //
  const [menuOpen, setMenuOpen] = useState(false);

  // FERMETURE DU MENU //
  const closeMenu = () => setMenuOpen(false);

  // PAGE CONTACT ACTIVE //
  const isContact = pathname === "/contact";

  return (
    <nav
      className="
        relative
        bg-[#1A2334] text-white
        flex justify-between
        w-[92%] md:w-[80%] lg:w-[65%]
        h-[96px]
        px-[2%] py-6
        mx-auto mt-[2%]
        rounded-[20px]
        backdrop-blur-lg bg-opacity-95
        shadow-[0px_0px_15px_0px_rgba(0,0,0,0.12),0px_25px_50px_-12px_rgba(0,0,0,0.40)]
      "
    >
      {/* PARTIE GAUCHE */}
      <div className="flex items-center space-x-8">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-[32px] font-extrabold leading-[35.2px]">
            weeb
          </h1>
        </Link>

        {/* LIENS DESKTOP */}
        <ul className="hidden lg:flex space-x-8 text-lg font-medium tracking-[0.5px]">
          {!isContact ? (
            <>
              <li>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="hover:text-purple-400 transition"
                >
                  À propos
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="hover:text-purple-400 transition"
                >
                  Contact
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="hover:text-purple-400 transition"
              >
                Contact
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* ACTIONS DESKTOP */}
      <div className="hidden lg:flex items-center space-x-8">
        {!isContact && (
          <Link
            to="/login"
            onClick={closeMenu}
            className="hover:text-purple-400 transition"
          >
            Connexion
          </Link>
        )}

        {isContact ? (
          <Link
            to="/login"
            onClick={closeMenu}
            className="bg-[#9333EA] px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Se connecter
          </Link>
        ) : (
          <Link
            to="/joinnow"
            onClick={closeMenu}
            className="bg-[#9333EA] px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Rejoindre
          </Link>
        )}
      </div>

      {/* BOUTON BURGER */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          className="
            bg-[#9333EA]
            w-[72px] h-[56px]
            rounded-[16px]
            flex items-center justify-center
            hover:bg-purple-700 transition
            shadow-[0px_10px_25px_-10px_rgba(147,51,234,0.6)]
          "
        >
          {menuOpen ? (
            <FiX className="text-[28px]" />
          ) : (
            <FiMenu className="text-[28px]" />
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div
          className="
            absolute top-[110px] left-1/2 -translate-x-1/2
            w-[92%] max-w-[520px]
            bg-[#1A2334] bg-opacity-95 backdrop-blur-lg
            rounded-[20px]
            shadow-lg
            flex flex-col items-center
            space-y-6 py-8
            lg:hidden
          "
        >
          {!isContact ? (
            <>
              <Link
                to="/about"
                className="text-white text-lg hover:text-purple-400"
                onClick={closeMenu}
              >
                À propos
              </Link>

              <Link
                to="/contact"
                className="text-white text-lg hover:text-purple-400"
                onClick={closeMenu}
              >
                Contact
              </Link>

              <Link
                to="/login"
                className="text-white text-lg hover:text-purple-400"
                onClick={closeMenu}
              >
                Connexion
              </Link>

              <Link
                to="/joinnow"
                className="bg-[#9333EA] text-white text-lg px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                onClick={closeMenu}
              >
                Rejoindre
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/contact"
                className="text-white text-lg hover:text-purple-400"
                onClick={closeMenu}
              >
                Contact
              </Link>

              <Link
                to="/login"
                className="bg-[#9333EA] text-white text-lg px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                onClick={closeMenu}
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
