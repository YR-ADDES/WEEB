## IMPORTS ##
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import InscriptionSerializer
from .models import Utilisateur

## VUE INSCRIPTION ##
class InscriptionView(APIView):

    def post(self, request):
        ## SERIALIZER ##
        serializer = InscriptionSerializer(data=request.data)

        ## VALIDATION ##
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Compte créé. En attente de validation admin."},
                status=status.HTTP_201_CREATED
            )

        ## ERREURS ##
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


## VUE CONNEXION ##
class ConnexionView(APIView):

    def post(self, request):
        ## RECUPERATION DONNEES ##
        email       = request.data.get("email")
        password    = request.data.get("password")

        ## VERIFICATION CHAMPS ##
        if not email or not password:
            return Response(
                {"message": "Email et mot de passe requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        ## AUTHENTIFICATION ##
        utilisateur = authenticate(username=email, password=password)

        ## IDENTIFIANTS INVALIDES ##
        if not utilisateur:
            return Response(
                {"message": "Identifiants invalides."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        ## COMPTE NON VALIDE PAR ADMIN ##
        if not utilisateur.is_active:
            return Response(
                {"message": "Compte en attente de validation admin."},
                status=status.HTTP_403_FORBIDDEN
            )

        ## GENERATION JWT ##
        refresh = RefreshToken.for_user(utilisateur)

        ## REPONSE ##
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "utilisateur": {
                    "id": utilisateur.id,
                    "email": utilisateur.email,
                    "prenom": utilisateur.prenom,
                    "nom": utilisateur.nom,
                    "is_staff": utilisateur.is_staff
                }
            },
            status=status.HTTP_200_OK
        )
