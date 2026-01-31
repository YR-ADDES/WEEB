## IMPORTS ##
import re
import nltk

from nltk.corpus        import stopwords
from nltk.stem.snowball import FrenchStemmer

## TELECHARGEMENT DES RESSOURCES NLTK ##
nltk.download("stopwords")

## NETTOYAGE DU TEXTE ##
def nettoyer_texte(texte):
    ## SECURISATION SI TEXTE NON VALIDE ##
    if texte is None:
        return ""

    ## CONVERSION EN STRING ##
    texte   = str(texte)

    ## PASSAGE EN MINUSCULE ##
    texte   = texte.lower()

    ## SUPPRESSION DES URLS ##
    texte   = re.sub(r"http\S+|www\S+|https\S+", "", texte)

    ## SUPPRESSION DES MENTIONS ET HASHTAGS ##
    texte   = re.sub(r"@\w+|#\w+", "", texte)

    ## SUPPRESSION DES CARACTERES SPECIAUX ##
    texte   = re.sub(r"[^a-zàâçéèêëîïôûùüÿñæœ ]", " ", texte)

    ## SUPPRESSION DES ESPACES MULTIPLES ##
    texte   = re.sub(r"\s+", " ", texte).strip()

    ## SUPPRESSION DES STOPWORDS FR ##
    stop_words  = set(stopwords.words("french"))
    mots        = texte.split()
    mots        = [mot for mot in mots if mot not in stop_words]

    ## RACINISATION ##
    stemmer     = FrenchStemmer()
    mots        = [stemmer.stem(mot) for mot in mots]

    ## TEXTE FINAL ##
    return " ".join(mots)
