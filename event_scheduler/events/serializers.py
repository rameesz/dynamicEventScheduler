from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

User = get_user_model()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        if data['username']:
            if User.objects.filter(username= data['username']).exists():
                raise serializers.ValidationError("Username already exists")
        if data['email']:
            if User.objects.filter(email= data['email']).exists():
                raise serializers.ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        user = User.objects.create(username= validated_data['username'], email= validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return validated_data
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()