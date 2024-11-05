from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer  
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny


class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate token for the new user
            token = AccessToken.for_user(user)
            return Response({'user': serializer.data, 'token': str(token)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Generate an access token for the user
            access_token = AccessToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access_token": str(access_token)  # Include the token in the response
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
