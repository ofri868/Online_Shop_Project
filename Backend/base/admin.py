from django.contrib import admin

# Register your models here.
from .models import Brand, Order, OrderDetail, Product, Profile, Review, Scale
 
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Brand)
admin.site.register(Scale)