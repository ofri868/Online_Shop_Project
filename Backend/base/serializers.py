from rest_framework import serializers
from .models import  Brand, Order, OrderDetail, Product, Profile, Review, Scale


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
    def create(self, validated_data):
        return OrderDetail.objects.create(**validated_data)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
    def create(self, validated_data):
        return Order.objects.create(**validated_data)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title','desc','price', 'brand', 'scale','image']
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Product.objects.create(**validated_data,user=user)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    def create(self, validated_data):   
        user = self.context['user']
        return Profile.objects.create(**validated_data,user=user)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
    def create(self, validated_data):
        return Review.objects.create(**validated_data)

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id','desc']
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Brand.objects.create(**validated_data,user=user)

class ScaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scale
        fields = ['id','desc']
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Scale.objects.create(**validated_data,user=user)