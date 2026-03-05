from rest_framework import serializers
from .models import Contact
from machine_learning.analyse_satisfaction import analyser_message

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ("satisfaction", "date_envoi")

    def create(self, validated_data):
        message = validated_data.get("message", "")
        validated_data["satisfaction"] = analyser_message(message)
        return super().create(validated_data)