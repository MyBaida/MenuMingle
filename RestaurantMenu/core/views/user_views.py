from django.shortcuts import render

# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser 
# from django.contrib.auth.models import User

from core.serializers import UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.hashers import make_password

# from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer