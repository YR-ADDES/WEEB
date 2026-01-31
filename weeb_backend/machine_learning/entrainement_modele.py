## IMPORTS ##
import pandas as pd
import joblib

from sklearn.model_selection            import train_test_split
from sklearn.feature_extraction.text    import TfidfVectorizer
from sklearn.linear_model               import LogisticRegression
from sklearn.metrics                    import accuracy_score, classification_report

from machine_learning.preparation_donnees import nettoyer_texte

## ENTRAINEMENT DU MODELE ##
def entrainer_modele():
    ## CHARGEMENT DU DATASET ##
    data = pd.read_csv(
        "machine_learning/avis_francais.csv",
        header      =None,
        encoding    ="utf-8",
        engine      ="python"
    )

    ## RENOMMAGE DES COLONNES ##
    data.columns    = ["id", "entite", "sentiment", "texte"]

    ## FILTRAGE DES SENTIMENTS UTILES ##
    data            = data[data["sentiment"].isin(["Positive", "Negative"])]

    ## CONVERSION EN LABEL BINAIRE ##
    data["label"]   = data["sentiment"].apply(
        lambda x: 1 if x == "Positive" else 0
    )

    ## NETTOYAGE DES TEXTES ##
    data["texte"]   = data["texte"].apply(nettoyer_texte)

    ## SUPPRESSION DES LIGNES VIDES ##
    data            = data[data["texte"].str.len() > 0]

    ## SEPARATION FEATURES / LABEL ##
    X = data["texte"]
    y = data["label"]

    ## SPLIT TRAIN / TEST ##
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size   =0.2,
        random_state=42,
        stratify    =y
    )

    ## VECTORISATION TF-IDF ##
    vectorizer = TfidfVectorizer(
        max_features    =5000,
        ngram_range     =(1, 2)
    )
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    ## MODELE LOGISTIC REGRESSION ##
    modele = LogisticRegression(max_iter=1000)
    modele.fit(X_train_vec, y_train)

    ## EVALUATION ##
    y_pred      = modele.predict(X_test_vec)
    precision   = accuracy_score(y_test, y_pred)

    print("## RESULTATS DU MODELE ##")
    print(f"Precision : {precision}")
    print("## RAPPORT DE CLASSIFICATION ##")
    print(classification_report(y_test, y_pred))

    ## SAUVEGARDE DU MODELE ET DU VECTORIZER ##
    joblib.dump(modele,     "machine_learning/modele_satisfaction.pkl")
    joblib.dump(vectorizer, "machine_learning/vectorizer.pkl")

    print("## SAUVEGARDE TERMINEE ##")

## EXECUTION ##
if __name__ == "__main__":
    entrainer_modele()
