from rest_framework.viewsets import ModelViewSet
from .models import Contact
from .serializers import ContactSerializer

## VIEWSET CONTACT ##
class ContactViewSet(ModelViewSet):

    ## QUERYSET ##
    queryset         = Contact.objects.all()

    ## SERIALIZER ##
    serializer_class = ContactSerializer
