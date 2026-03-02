## IMPORTS DRF ##
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

## IMPORTS LOCAUX ##
from .models import Article
from .serializers import ArticleSerializer
from .permissions import EstAuteurOuAdmin

## VIEWSET ARTICLE ##
class ArticleViewSet(ModelViewSet):

    ## QUERYSET ##
    queryset = Article.objects.all().order_by("-date_creation")

    ## SERIALIZER ##
    serializer_class = ArticleSerializer

    ## PERMISSIONS ##
    permission_classes = [IsAuthenticatedOrReadOnly, EstAuteurOuAdmin]

    ## CREATION SECURISEE ##
    def perform_create(self, serializer):
        ## FORCER AUTEUR = UTILISATEUR CONNECTE ##
        serializer.save(auteur=self.request.user)