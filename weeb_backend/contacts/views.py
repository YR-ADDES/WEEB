## IMPORTS DRF ##
from rest_framework.viewsets import ModelViewSet

## IMPORTS LOCAUX ##
from .models import Contact
from .serializers import ContactSerializer
from .permissions import ContactPublicOuAdmin

## VIEWSET CONTACT ##
class ContactViewSet(ModelViewSet):

    ## QUERYSET ##
    queryset = Contact.objects.all().order_by("-date_envoi")

    ## SERIALIZER ##
    serializer_class = ContactSerializer

    ## PERMISSIONS ##
    permission_classes = [ContactPublicOuAdmin]