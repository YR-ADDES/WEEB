## IMPORTS ##
from django.contrib.auth.models import AbstractUser
from django.db import models

## MODELE UTILISATEUR PERSONNALISE ##
class Utilisateur(AbstractUser):

    ## CHAMPS UTILISATEUR ##
    prenom  = models.CharField(max_length=100)
    nom     = models.CharField(max_length=100)

    ## STRING ##
    def __str__(self):
        return f"{self.prenom} {self.nom}"
