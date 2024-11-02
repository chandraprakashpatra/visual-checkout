from django.shortcuts import render

# Create your views here.
# users/views.py

#for registration
from rest_framework import generics#
from rest_framework.response import Response#
from rest_framework import status
from .serializers import UserSerializer

#for login
from rest_framework import permissions
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

#for user search
from rest_framework.permissions import IsAuthenticated  
from django.contrib.auth.models import User

#registration api view
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#login api view
# class UserLoginView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             print('succesful login')
#             return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
#         return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token = AccessToken.for_user(user)
            return Response({"token": str(token)}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)


#search a user
# class UserSearchView(generics.ListAPIView):
#     serializer_class = UserSerializer

#     def get(self, request, *args, **kwargs):
#         username = request.query_params.get('username', None)
#         if username is not None:
#             users = User.objects.filter(username__icontains=username)
#             serializer = self.get_serializer(users, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response({"error": "No username provided."}, status=status.HTTP_400_BAD_REQUEST)
class UserSearchView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request, *args, **kwargs):
        username = request.query_params.get('username', None)
        if username is not None:
            users = User.objects.exclude(username=request.user.username).filter(username__icontains=username)
            serializer = self.get_serializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "No username provided."}, status=status.HTTP_400_BAD_REQUEST)