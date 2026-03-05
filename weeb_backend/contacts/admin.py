# from django.contrib import admin
# from .models import Contact


# @admin.register(Contact)
# class ContactAdmin(admin.ModelAdmin):
#     list_display        = ("email", "nom", "prenom", "telephone", "satisfaction", "date_envoi")
#     search_fields       = ("email", "nom", "prenom")
#     list_filter         = ("satisfaction", "date_envoi")
#     ordering            = ("-date_envoi",)


from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "date_envoi")