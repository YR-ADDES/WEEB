from rest_framework import serializers
from .models import Article

## SERIALIZER ARTICLE ##
class ArticleSerializer(serializers.ModelSerializer):

    ## AUTEUR EN LECTURE SEULE ##
    auteur = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Article
        fields = "__all__"