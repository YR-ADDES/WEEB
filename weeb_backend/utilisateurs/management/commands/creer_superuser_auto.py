## IMPORTS ##
import os

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

## COMMANDE CREATION SUPERUSER ##
class Command(BaseCommand):

    ## AIDE ##
    help = "Cree automatiquement un superuser si les variables d'environnement sont presentes."

    ## HANDLE ##
    def handle(self, *args, **options):

        ## LIRE VARIABLES ENV ##
        email       = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        username    = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password    = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        ## VERIFIER PRESENCE ##
        if not email or not username or not password:
            self.stdout.write(self.style.WARNING("Variables superuser absentes -> aucun superuser cree."))
            return

        ## RECUPERER MODELE USER ##
        User = get_user_model()

        ## VERIFIER EXISTENCE ##
        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.SUCCESS("Superuser deja existant -> aucune action."))
            return

        ## CREER SUPERUSER ##
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )

        ## OK ##
        self.stdout.write(self.style.SUCCESS("Superuser cree avec succes."))