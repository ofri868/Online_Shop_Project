import json
from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Cart, Product, Profile, Category
from .serializers import CartSerializer, CategorySerializer, ProductSerializer, ProfileSerializer

# Create your views here.

#  /////////////// login start

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
        username=request.data['username'],
        password=request.data['password'],
        email=request.data['email']
    )
    user.is_active = True
    user.is_staff = False
    user.save()
    return Response("user created successfully")

# /////////////////////// login end

# public index

@api_view(['GET'])
def index(request):
    return Response("hello")

#########################################################################
###############################Cart API##################################
#########################################################################

class CartView(APIView):
    """
    This class handle the CRUD operations for MyModel
    """

    def get(self, request):
        """Handle GET requests to return a list of MyModel objects"""
        temp = Cart.objects.all()
        my_model = temp.filter(user=request.user.id)
        serializer = CartSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Handle POST requests to create a new Task object"""

        serializer = CartSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Handle PUT requests to update an existing Task object"""
        my_model = Cart.objects.get(pk=pk)
        serializer = CartSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Handle DELETE requests to delete a Task object"""
        my_model = Cart.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#########################################################################
############################Product API##################################
#########################################################################

class ProductView(APIView):
    """This class handle the CRUD operations for MyModel"""

    def get(self, request):
        """Handle GET requests to return a list of MyModel objects"""
        my_model = Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Handle POST requests to create a new Task object"""

        serializer = ProductSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Handle PUT requests to update an existing Task object"""
        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Handle DELETE requests to delete a Task object"""
        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#########################################################################
############################Profile API##################################
#########################################################################

@permission_classes([IsAuthenticated])
class ProfileView(APIView):
    """This class handle the CRUD operations for MyModel"""

    def get(self, request):
        """Handle GET requests to return a list of MyModel objects"""
        temp = Profile.objects.all()
        my_model = temp.filter(user=request.user.id)
        serializer = ProfileSerializer(my_model, many=True)
        return Response(serializer.data)

    def put(self, request):
        """Handle PUT requests to update an existing Task object"""
        my_model = Profile.objects.get(id=request.user.id)
        print(request.data)
        serializer = ProfileSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

#########################################################################
############################Profile API##################################
#########################################################################

class CategoryView(APIView):
    """This class handle the CRUD operations for MyModel"""

    def get(self, request):
        """Handle GET requests to return a list of MyModel objects"""
        my_model = Category.objects.all()
        serializer = CategorySerializer(my_model, many=True)
        return Response(serializer.data)