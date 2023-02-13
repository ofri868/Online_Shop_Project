from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
# Create your models here.

class Category(models.Model):
    user =models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    desc = models.CharField(max_length=15,null=True,blank=True)
    createdTime=models.DateTimeField(auto_now_add=True)
 
    def __str__(self):
           return self.desc

class Product(models.Model):
    user =models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    desc = models.CharField(max_length=150,blank=True)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    createdTime=models.DateTimeField(auto_now_add=True)
    category=models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
 
    def __str__(self):
           return self.desc

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdTime=models.DateTimeField(auto_now_add=True)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    amount =  models.IntegerField(null=True)

class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    username = models.CharField(max_length=150,blank=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    title = models.CharField(max_length=40,blank=True)
    desc = models.TextField(max_length=500,blank=True)
    rating = models.FloatField(null=True) 

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    created = models.BooleanField(default=False)
    image = models.ImageField(null=True,blank=True,default='/profile.jpg')
    first_name = models.CharField(max_length=40,null=True,blank=True)
    last_name = models.CharField(max_length=40,null=True,blank=True)
    address = models.CharField(max_length=40,null=True,blank=True)
    city= models.CharField(max_length=40,null=True,blank=True)
    zip_code = models.CharField(max_length=40,null=True,blank=True)
    billing_address = models.CharField(max_length=40,null=True,blank=True)
    billing_city= models.CharField(max_length=40,null=True,blank=True)
    billing_zip_code = models.CharField(max_length=40,null=True,blank=True)
    
    def __str__(self):
        if self.created:
           return self.first_name + self.last_name
        else:
           return self.user

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()