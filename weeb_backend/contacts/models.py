from django.db import models

class Contact(models.Model):
    nom          = models.CharField(max_length=120)
    prenom       = models.CharField(max_length=120)
    telephone    = models.CharField(max_length=30, null=True, blank=True)  
    email        = models.EmailField()
    message      = models.TextField()

    # ML
    satisfaction = models.IntegerField(null=True, blank=True)

    date_envoi   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.email}"