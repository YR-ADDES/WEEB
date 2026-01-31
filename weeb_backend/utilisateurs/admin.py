## IMPORTS ##
from django.contrib import admin
from .models        import Utilisateur
 
## ENREGISTREMENT UTILISATEUR DANS L'ADMIN ##
@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    ## COLONNES A AFFICHER ##
    list_display    = ('email', 'prenom', 'nom', 'is_active', 'is_staff')

    ## FILTRES ##
    list_filter     = ('is_active', 'is_staff')

    ## CHAMPS DE RECHERCHE ##
    search_fields   = ('email', 'prenom', 'nom')

    ## ORDRE PAR DEFAUT ##
    ordering        = ('email',)

