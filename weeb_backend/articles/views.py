from rest_framework.viewsets import ModelViewSet
from .models import Article
from .serializers import ArticleSerializer

## VIEWSET ARTICLE ##
class ArticleViewSet(ModelViewSet):

    ## QUERYSET ##
    queryset         = Article.objects.all()

    ## SERIALIZER ##
    serializer_class = ArticleSerializer
