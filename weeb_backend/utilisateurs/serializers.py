## IMPORTS ##
from django.db      import IntegrityError
from rest_framework import serializers
from .models        import Utilisateur

## SERIALIZER UTILISATEUR ##
class UtilisateurSerializer(serializers.ModelSerializer):

    class Meta:
        model   = Utilisateur
        fields  = '__all__'


## SERIALIZER INSCRIPTION ##
class InscriptionSerializer(serializers.ModelSerializer):
    password    = serializers.CharField(write_only=True)

    class Meta:
        model   = Utilisateur
        fields  = ['id', 'prenom', 'nom', 'email', 'password']

    def create(self, validated_data):
        ## RECUPERATION DONNEES ##
        email       = validated_data.get('email')
        password    = validated_data.get('password')
        prenom      = validated_data.get('prenom')
        nom         = validated_data.get('nom')

        ## USERNAME AUTO (OBLIGATOIRE POUR ABSTRACTUSER) ##
        username    = email

        ## VERIFICATION EXISTENCE EMAIL / USERNAME ##
        if Utilisateur.objects.filter(username=username).exists() or Utilisateur.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Un compte avec cet email existe déjà."})

        ## CREATION UTILISATEUR INACTIF (VALIDATION ADMIN) ##
        try:
            utilisateur = Utilisateur.objects.create_user(
                username    =username,
                email       =email,
                password    =password,
                prenom      =prenom,
                nom         =nom,
                is_active   =False
            )
        except IntegrityError:
            raise serializers.ValidationError({"email": "Un compte avec cet email existe déjà."})

        return utilisateur
