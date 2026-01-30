from rest_framework import serializers
from .models        import Article

## SERIALIZER ARTICLE ##
class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model   = Article
        fields  = '__all__'
