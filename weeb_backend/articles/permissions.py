## IMPORTS DRF ##
from rest_framework.permissions import BasePermission, SAFE_METHODS

## PERMISSION : LECTURE PUBLIQUE / ECRITURE AUTH ##
class EstAuteurOuAdmin(BasePermission):
    ## VERIFICATION PERMISSION ##
    def has_object_permission(self, request, view, obj):
        ## LECTURE AUTORISEE POUR TOUS ##
        if request.method in SAFE_METHODS:
            return True

        ## UTILISATEUR DOIT ETRE AUTHENTIFIE ##
        if not request.user or not request.user.is_authenticated:
            return False

        ## ADMIN AUTORISE ##
        if request.user.is_staff:
            return True

        ## AUTEUR SEUL AUTORISE ##
        return obj.auteur == request.user