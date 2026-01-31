## IMPORTS ##
import os
import joblib

from machine_learning.preparation_donnees import nettoyer_texte

## CHEMINS DES FICHIERS ##
CHEMIN_MODELE       = "machine_learning/modele_satisfaction.pkl"
CHEMIN_VECTORIZER   = "machine_learning/vectorizer.pkl"

## CHARGEMENT DU MODELE ##
def charger_modele():
    ## VERIFICATION FICHIERS ##
    if not os.path.exists(CHEMIN_MODELE) or not os.path.exists(CHEMIN_VECTORIZER):
        raise FileNotFoundError(
            "Modele non trouve. Lance d'abord : python machine_learning/entrainement_modele.py"
        )

    ## CHARGEMENT ##
    modele      = joblib.load(CHEMIN_MODELE)
    vectorizer  = joblib.load(CHEMIN_VECTORIZER)

    return modele, vectorizer

## ANALYSE DE SATISFACTION ##
def analyser_message(message):
    ## CHARGEMENT MODELE ##
    modele, vectorizer = charger_modele()

    ## SECURISATION ##
    if message is None:
        message = ""

    ## NETTOYAGE ##
    message_nettoye = nettoyer_texte(message)

    ## VECTORISATION ##
    vecteur = vectorizer.transform([message_nettoye])

    ## PREDICTION ##
    prediction = modele.predict(vecteur)

    ## RETOUR 0 / 1 ##
    return int(prediction[0])
