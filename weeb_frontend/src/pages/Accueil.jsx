// ## IMPORT ROUTER ## //
import { Link } from "react-router-dom";

// ## IMPORT REACT ## //
import { useState } from "react";


// ## PAGE : ACCUEIL ## //
export default function Accueil() {

  // ## ETAT LOCAL (UTILISABLE PLUS TARD) ## //
  const [_loading, _setLoading] = useState(false);

  // ## RENDU ## //
  return (
    <div className="bg-[#0E1729] min-h-screen flex flex-col items-center">

      {/* ## SECTION ACCUEIL ## */}
      <div className="w-full py-16 px-5 sm:px-8">

        {/* ## HEADER ## */}
        <header className="text-center py-5 mx-auto max-w-4xl">

          {/* ## TITRE PRINCIPAL ## */}
          <h1 className="font-bold text-[28px] sm:text-[36px] md:text-[56px] leading-tight tracking-[0%] text-white">
            Explorez le <span className="text-purple-400 font-light">Web</span> sous toutes
            <br className="hidden md:block" /> ses{" "}
            <span className="font-extrabold border-b-4 border-[#C084FC]">facettes</span>
          </h1>

          {/* ## TEXTE INTRO ## */}
          <p className="font-normal text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-white mt-6 sm:mt-8 mx-auto px-2">
            Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances,
            technologies et meilleures pratiques.
          </p>

          {/* ## BOUTONS CTA ## */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">

            {/* ## LIEN VERS BLOG ## */}
            <Link
              to="/blog"
              className="w-full sm:w-auto max-w-[300px] bg-purple-600 text-white px-8 h-[56px] p-[16px] rounded-[8px] hover:bg-purple-700 transition font-medium text-[18px] flex items-center justify-center"
            >
              Découvrir les articles
            </Link>

            {/* ## LIEN VERS JOINNOW ## */}
            <Link
              to="/joinnow"
              className="text-white w-full sm:w-auto max-w-[300px] px-8 h-[56px] rounded-[8px] border-2 hover:bg-gray-800 transition font-medium text-[18px] flex items-center justify-center"
            >
              S'abonner à la newsletter
            </Link>
          </div>
        </header>

        {/* ## IMAGE PRINCIPALE ## */}
        <section className="flex justify-center py-10">
          <img
            src="/images/mockup.png"
            alt="Mockup"
            className="w-full sm:w-4/5 md:w-3/4 h-auto"
          />
        </section>

        {/* ## SECTION : ILS NOUS FONT CONFIANCE ## */}
        <section className="text-center py-16">
          <h2 className="font-extrabold text-[28px] sm:text-[40px] md:text-[48px] leading-tight text-white">
            Ils nous font confiance
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8">
            {["SmartFinder", "Zoomerr", "SHELLS", "WAVES", "ArtVenue"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <img
                  src={`/images/${brand.toLowerCase()}.png`}
                  alt={brand}
                  className="h-6 sm:h-8"
                />
                <span className="text-white font-bold text-[16px] sm:text-[18px] md:text-[24px]">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ## SECTION : APPRENDRE ET PROGRESSER ## */}
        <section className="flex flex-col md:flex-row items-center justify-center w-full py-16">
          <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10 px-4">

            {/* ## TEXTE ## */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-white uppercase tracking-[3px]">
                Des ressources pour tous les niveaux
              </h3>

              <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-bold text-white mt-4">
                <span className="text-purple-400">Apprenez</span> et{" "}
                <span className="text-purple-400">progressez</span>
              </h2>

              <div className="flex justify-center my-6 md:hidden">
                <img
                  src="/images/mockup.png"
                  alt="Mockup"
                  className="w-full max-w-[300px] sm:max-w-[550px] rounded-[20px] object-cover"
                />
              </div>

              <p className="text-white mt-6 text-[15px] sm:text-[18px] leading-relaxed">
                Que vous débutiez en développement web ou que vous soyez un expert, nous vous proposons des
                tutoriels et bonnes pratiques pour apprendre efficacement.
              </p>

              <button className="mt-8 text-white text-[18px] font-bold hover:underline">
                Explorer les ressources →
              </button>
            </div>

            {/* ## IMAGE ## */}
            <div className="hidden md:flex w-full md:w-1/2 justify-center">
              <img
                src="/images/mockup.png"
                alt="mockup"
                className="w-full max-w-[300px] sm:max-w-[550px] md:max-w-[632px] rounded-[20px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ## SECTION : TENDANCES ## */}
        <section className="flex flex-col md:flex-row items-center justify-between w-full py-16 px-5">
          <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10 px-4">

            <div className="hidden md:flex w-full md:w-2/5 justify-center">
              <img
                src="/images/carre.png"
                alt="Carre"
                className="w-full max-w-[350px] sm:max-w-[600px] md:max-w-[700px] rounded-xl object-contain"
              />
            </div>

            <div className="w-full md:w-3/5 text-center md:text-left">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-white uppercase tracking-[3px]">
                Le web, un écosystème en constante évolution
              </h3>

              <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-bold text-white mt-6">
                Restez informé des dernières <span className="text-purple-400">tendances</span>
              </h2>

              <div className="flex justify-center my-6 md:hidden">
                <img
                  src="/images/carre.png"
                  alt="Carre"
                  className="w-full max-w-[350px] sm:max-w-[600px] rounded-xl object-contain"
                />
              </div>

              <p className="text-white mt-6 text-[15px] sm:text-[18px] leading-relaxed">
                Chaque semaine, nous analysons les nouveautés du web : frameworks, SEO, accessibilité, et
                plus encore.
              </p>

              {/* ## LIEN VERS BLOG ## */}
              <Link
                to="/blog"
                className="mt-8 inline-block text-white text-[18px] font-bold hover:underline"
              >
                Lire les articles récents →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
