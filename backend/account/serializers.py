from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'role']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # Hashing
        return super().create(validated_data)
