from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    # authenticate
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register),
    path('', views.index),
    path('cart', views.CartView.as_view()),
    path('category', views.CategoryView.as_view()),
    path('products', views.ProductView.as_view()),
    path('profile', views.ProfileView.as_view()),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
