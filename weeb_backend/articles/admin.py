## IMPORTS ##
from django.contrib import admin
from .models import Article

## ADMIN ARTICLE ##
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):

    ## LISTE ##
    list_display = ("id", "titre", "auteur", "date_creation")

    ## RECHERCHE ##
    search_fields = ("titre", "contenu", "auteur__email")

    ## FILTRES ##
    list_filter = ("date_creation",)

    ## TRI ##
    ordering = ("-date_creation",)