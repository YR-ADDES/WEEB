## IMPORTS DRF ##
from rest_framework.permissions import BasePermission

## PERMISSION : POST PUBLIC / RESTE ADMIN ##
class ContactPublicOuAdmin(BasePermission):

    ## VERIFICATION PERMISSION GENERALE ##
    def has_permission(self, request, view):
        ## CREATION MESSAGE AUTORISEE POUR TOUS ##
        if request.method == "POST":
            return True

        ## LECTURE / MODIF / SUPPRESSION UNIQUEMENT ADMIN ##
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)