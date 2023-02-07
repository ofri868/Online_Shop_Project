from rest_framework import serializers
from .models import Order, Product, Profile, Category, Review


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Order.objects.create(**validated_data,user=user)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','desc','price', 'category','image']
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
        user = self.context['user']
        return Review.objects.create(**validated_data,user=user)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','desc']
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Category.objects.create(**validated_data,user=user)