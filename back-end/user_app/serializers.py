from rest_framework.serializers import ModelSerializer
from .models import AppUser

class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["id", "display_name", "email"]

class DisplayNameSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['display_name']