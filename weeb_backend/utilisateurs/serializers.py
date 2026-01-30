from rest_framework import serializers
from .models        import Utilisateur

## SERIALIZER UTILISATEUR ##
class UtilisateurSerializer(serializers.ModelSerializer):

    class Meta:
        model   = Utilisateur
        fields  = '__all__'
