from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from base.models import Profile

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.api.serializers import UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    # perform checks
    userRecs = User.objects.filter(username=data['username'])
    if userRecs:
        message = {'detail':'User with this username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    userRecs = User.objects.filter(email=data['email'])
    if userRecs:
        message = {'detail':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    userRecs = Profile.objects.filter(TIN=data['TIN'])
    if userRecs:
        message = {'detail':'User with this TIN already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # follow through
    userObj = User.objects.create(
        username = data['username'],
        password = make_password(data['password']),
        first_name = data['first_name'],
        last_name = data['last_name'],
        email = data['email']
    )
    profile = Profile.objects.create(
        user = userObj,
        phone = data['phone'],
        country = data['country'],
        city = data['city'],
        address = data['address'],
        TIN = data['TIN']
    )
    serializer = UserSerializerWithToken(userObj, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    response = Response(serializer.data)
    #response["Access-Control-Allow-Origin"] = "*"
    return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['first_name']
    user.username = data['username']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
        
    user.save()
    response = Response(serializer.data)
    #response["Access-Control-Allow-Origin"] = "*"
    return response

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    response = Response(serializer.data)
    #response["Access-Control-Allow-Origin"] = "*"
    return response

