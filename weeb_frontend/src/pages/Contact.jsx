// IMPORTS  //
import { useState } from "react";

// IMPORT DE L'INSTANCE API (AXIOS CONFIGURÉ) //
import api from "../api/api_front.js";


export default function Contact() {

  // ETAT DU FORMULAIRE //
  const [formData, setFormData] = useState({
    nom:        "",
    prenom:     "",
    telephone:  "",
    email:      "",
    message:    "",
  });

  // ETAT DU MESSAGE DE RETOUR UTILISATEUR //
  const [result, setResult] = useState(null);


  // GESTION DES CHANGEMENTS DE CHAMPS (FORM CONTROLLED) //
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // SOUMISSION DU FORMULAIRE (APPEL API DJANGO) // 
  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    // ENVOI DES DONNÉES AU BACKEND (CHAMPS ALIGNÉS MODELE Contact) //
    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.telephone ? formData.telephone.replace(/\s/g, "") : null,
      email: formData.email,
      message: formData.message,
    };

    // ✅ ENDPOINT DRF VIA ROUTER : /api/contacts/
    const res = await api.post("/api/contacts/", payload);

    // MESSAGE SELON LA REPONSE API (ML) //
    setResult(
      res?.data?.satisfaction === 1
        ? "Merci pour votre retour positif !"
        : "Merci pour votre message, nous allons nous améliorer."
    );
  } catch (err) {
    console.error("ERREUR ENVOI CONTACT :", err);

    const apiMsg =
      err?.response?.data?.detail ||
      err?.response?.data?.message;

    setResult(apiMsg || "Erreur lors de l'envoi du message.");
  }
};


  // RENDU DE LA PAGE //
  return (
    <div className="max-h-[1440px] text-white flex flex-col items-center px-4">

      <div className="text-center py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Votre avis compte !
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-300">
          Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez
          <br className="hidden sm:block" />
          et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours
          <br className="hidden sm:block" />
          plus utile et enrichissante.
        </p>
      </div>

      {/* FORMULAIRE DE CONTACT */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[800px] p-[30px] gap-[30px] sm:gap-[45px] rounded-[20px] border-2 border-[#C084FC] bg-[#1f223d] bg-opacity-10 shadow-lg flex flex-col items-center mb-5 sm:mb-[5%]"
      >

        {/* CHAMPS NOM & PRENOM */}
        <div className="flex flex-col sm:flex-row w-full justify-center gap-4">
          <input
            className="w-full sm:w-[321px] h-[41px] bg-transparent placeholder-[#C084FC] text-white py-2 border-b border-[#C084FC] focus:outline-none text-center"
            type="text"
            placeholder="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />

          <input
            className="w-full sm:w-[321px] h-[41px] bg-transparent placeholder-[#C084FC] text-white py-2 border-b border-[#C084FC] focus:outline-none text-center"
            type="text"
            placeholder="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
        </div>

        {/* LIGNE : TÉLÉPHONE + EMAIL */}
        <div className="flex flex-col sm:flex-row w-full justify-center gap-4 mt-2">

          {/* CHAMP TÉLÉPHONE */}
          <div className="w-full sm:w-[321px] h-[41px] flex items-center border-b border-[#C084FC]">
            <span className="text-[#C084FC] px-3 border-r border-[#C084FC]">
              +33
            </span>

            <input
              className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
              type="tel"
              placeholder="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>

          {/* CHAMP EMAIL */}
          <div className="w-full sm:w-[321px] h-[41px] flex items-center border-b border-[#C084FC]">
            <input
              className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none text-center"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* CHAMP MESSAGE */}
        <div className="w-full sm:w-[642px] border-b border-[#C084FC]">
          <textarea
            className="w-full bg-transparent placeholder-[#C084FC] text-white focus:outline-none resize-none text-center"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* BOUTON D'ENVOI */}
        <div className="text-center w-full">
          <button
            type="submit"
            className="bg-[#9333EA] w-full sm:w-[116px] h-[48px] p-[12px] rounded-[8px] border-2 border-[#9333EA] hover:bg-purple-700 text-white transition duration-300"
          >
            Contact
          </button>
        </div>

        {/* MESSAGE DE RETOUR UTILISATEUR */}
        {result && <p className="mt-4 text-lg text-center">{result}</p>}
      </form>
    </div>
  );
}
