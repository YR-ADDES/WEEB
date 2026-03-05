# ## IMPORTS ##
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import InscriptionSerializer

# ## PROFIL UTILISATEUR CONNECTÉ ##
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(
        {
            "id": request.user.id,
            "email": getattr(request.user, "email", ""),
            "prenom": getattr(request.user, "prenom", ""),
            "nom": getattr(request.user, "nom", ""),
            "is_staff": getattr(request.user, "is_staff", False),
        },
        status=status.HTTP_200_OK
    )

# ## INSCRIPTION ##
class InscriptionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = InscriptionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Compte créé. En attente de validation admin."},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ## CONNEXION ##
class ConnexionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"message": "Email et mot de passe requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        ## IMPORTANT : user utilise l'email comme identifiant ##
        utilisateur = authenticate(username=email, password=password)

        if not utilisateur:
            return Response(
                {"message": "Identifiants invalides."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        ## CONTROLE ACTIVATION UTILISATEUR ##
        if not utilisateur.is_active:
            return Response(
                {"message": "Compte en attente de validation admin."},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(utilisateur)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "utilisateur": {
                    "id":           utilisateur.id,
                    "email":        utilisateur.email,
                    "prenom":       getattr(utilisateur, "prenom", ""),
                    "nom":          getattr(utilisateur, "nom", ""),
                    "is_staff":     utilisateur.is_staff,
                },
            },
            status=status.HTTP_200_OK
        )