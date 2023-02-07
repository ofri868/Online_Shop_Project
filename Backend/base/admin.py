from django.contrib import admin

# Register your models here.
from .models import Order, Product, Category, Profile, Review
 
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(Category)