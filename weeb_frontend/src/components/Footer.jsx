// IMPORTS ICONES //
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

// IMPORT ROUTER //
import { Link } from "react-router-dom";

export default function Footer() {

  // ANNEE COURANTE //
  const annee = new Date().getFullYear();

  // SECTIONS FOOTER //
  const sections = [
    {
      title: "PRODUIT",
      links: [
        { label: "Tarifs", to: "/joinnow" },
        { label: "Aperçu", to: "/" },
        { label: "Blog", to: "/blog" },
      ],
    },
    {
      title: "RESSOURCES",
      links: [
        { label: "Centre d'aide", to: "/contact" },
        { label: "Tutoriels", to: "/blog" },
      ],
    },
    {
      title: "ENTREPRISE",
      links: [
        { label: "À propos", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "COMPTE",
      links: [
        { label: "Connexion", to: "/login" },
        { label: "Rejoindre", to: "/joinnow" },
      ],
    },
  ];
 
  // RESEAUX SOCIAUX //
    const reseaux = [
    { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com" },
    { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com" },
    { icon: FaTwitter, label: "X", href: "https://twitter.com" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com" },
    ];


  return (
    <footer className="bg-white text-black w-full border-t border-gray-200">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* LOGO */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex items-center">
            <h1 className="text-2xl font-bold mb-6">weeb</h1>
          </Link>
        </div>

        {/* SECTIONS */}
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-gray-400 text-sm font-medium mb-4">
              {section.title}
            </h3>

            <ul className="flex flex-col space-y-3">
              {section.links.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#0F172A] text-sm font-light hover:text-purple-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-600 text-center sm:text-left">
            © {annee} Weeb. Tous droits réservés.
          </p>

          {/* RESEAUX */}
            <div className="flex space-x-5 text-gray-700">
            {reseaux.map((reseau) => (
                <a
                key={reseau.label}
                href={reseau.href}
                target="_blank"
                rel="noreferrer"
                aria-label={reseau.label}
                className="cursor-pointer text-lg hover:text-purple-500 transition"
                >
                <reseau.icon />
                </a>
            ))}
            </div> 
        </div>
      </div>
    </footer>
  );
}
