## IMPORTS ##
from django.urls import path
from .views import InscriptionView, ConnexionView

## ROUTES UTILISATEURS ##
urlpatterns = [
    ## INSCRIPTION ##
    path("inscription/", InscriptionView.as_view(), name="inscription"),
    ## CONNEXION ##
    path("connexion/", ConnexionView.as_view(), name="connexion"),
]
