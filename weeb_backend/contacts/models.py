from django.db import models

## MODELE CONTACT ##
class Contact(models.Model):

    ## CHAMPS ##
    email           = models.EmailField()
    message         = models.TextField() 
    satisfaction    = models.IntegerField(null=True, blank=True)
    date_envoi      = models.DateTimeField(auto_now_add=True)

    ## STRING ##
    def __str__(self):
        return self.email
