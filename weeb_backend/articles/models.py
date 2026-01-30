from django.db import models
from django.conf import settings

## MODELE ARTICLE ##
class Article(models.Model):

    ## CHAMPS ##
    titre           = models.CharField(max_length=255)
    contenu         = models.TextField()
    auteur          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_creation   = models.DateTimeField(auto_now_add=True)

    ## STRING ##
    def __str__(self):
        return self.titre
