from rest_framework import serializers
from .models        import Contact

## SERIALIZER CONTACT ##
class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model   = Contact
        fields  = '__all__'
