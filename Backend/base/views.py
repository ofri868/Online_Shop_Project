from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Order, Product, Profile, Brand, Scale, Review
from .serializers import BrandSerializer, OrderDetailSerializer, ProductSerializer, ProfileSerializer, ReviewSerializer, ScaleSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

#  /////////////// login start

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['isAdmin']= user.is_superuser
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refreshToken"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
###############################Order API#################################
#########################################################################

@permission_classes([IsAuthenticated])
class OrderView(APIView):
    """
    This class handle the CRUD operations for Order
    """

    def get(self, request):
        """Handle GET requests to return a list of Orders"""
        temp = Order.objects.all()
        my_model = temp.filter(user=request.user.id)
        serializer = OrderDetailSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Handle POST requests to create a new Order"""

        if(request.user.id):
            cart_validation = False
            for item in request.data['orderDetails']:
                item['order']=Order.objects.values_list('id', flat=True).filter(user=request.user.id).last()
                valid_test = OrderDetailSerializer(data=item, context={'user': request.user})
                if valid_test.is_valid():
                    cart_validation = True
                else:
                    cart_validation = False
            if(cart_validation):
                print(request.data)
                order = request.data['order']
                new_order = Order(
                    user_id=request.user.id,
                    address = order['address'],
                    city = order['city'], 
                    zip_code = order['zip_code'], 
                    billing_address = order['billing_address'], 
                    billing_city = order['billing_city'], 
                    billing_zip_code = order['billing_zip_code'] )
                new_order.save()
                for item in request.data['orderDetails']:
                    item['order']=Order.objects.values_list('id', flat=True).filter(user=request.user.id).last()
                    serializer = OrderDetailSerializer(data=item, context={'user': request.user})
                    if serializer.is_valid():
                        serializer.save()
                return Response("success")
        return Response('failed')

#########################################################################
############################Product API##################################
#########################################################################

class ProductView(APIView):
    """This class handle the CRUD operations for Product"""

    def get(self, request, msg=''):
        """Handle GET requests to return a list of Product objects"""
        if msg == 'new':
            my_model = Product.objects.order_by('-createdTime')[:8]
            serializer = ProductSerializer(my_model, many=True)
        else:
            my_model = Product.objects.all()
            serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Handle POST requests to create a new Product"""

        serializer = ProductSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Handle PUT requests to update an existing Product"""
        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Handle DELETE requests to delete a Product"""
        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#########################################################################
############################Profile API##################################
#########################################################################

@permission_classes([IsAuthenticated])
class ProfileView(APIView):
    """This class handle the CRUD operations for Profile"""

    def get(self, request):
        """Handle GET requests to return a list of Profiles"""
        temp = Profile.objects.all()
        my_model = temp.filter(user=request.user.id)
        serializer = ProfileSerializer(my_model, many=True)
        return Response(serializer.data)

    def put(self, request):
        """Handle PUT requests to update an existing Profile"""
        print(request.user.id)
        my_model = Profile.objects.get(user=request.user.id)
        serializer = ProfileSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

#########################################################################
##############################Brand API##################################
#########################################################################

class BrandView(APIView):
    """This class handle the CRUD operations for Category"""

    def get(self, request):
        """Handle GET requests to return a list of Categories"""
        my_model = Brand.objects.all()
        serializer = BrandSerializer(my_model, many=True)
        return Response(serializer.data)

#########################################################################
##############################Scale API##################################
#########################################################################

class ScaleView(APIView):
    """This class handle the CRUD operations for Category"""

    def get(self, request):
        """Handle GET requests to return a list of Categories"""
        my_model = Scale.objects.all()
        serializer = ScaleSerializer(my_model, many=True)
        return Response(serializer.data)

#########################################################################
############################Profile API##################################
#########################################################################

class ReviewView(APIView):
    """This class handle the CRUD operations for Review"""

    def get(self, request, id):
        """Handle GET requests to return a list of Reviews"""
        my_model = Review.objects.all().filter(product = id)
        serializer = ReviewSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        permission_classes([IsAuthenticated])
        """Handle POST requests to update an existing Review"""
        print(request.data)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Review added successfully')
        return Response(serializer.errors)
