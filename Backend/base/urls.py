from django.urls import path
from .views import MyTokenObtainPairView, ReviewView, index, register, OrderView, LogoutView, ProductView, ProfileView, BrandView, ScaleView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # authenticate
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register),
    path('', index),
    path('order', OrderView.as_view()),
    path('brand', BrandView.as_view()),
    path('scale', ScaleView.as_view()),
    path('products', ProductView.as_view()),
    path('products/<msg>', ProductView.as_view()),
    path('profile', ProfileView.as_view()),
    path('review', ReviewView.as_view()),
    path('review/<int:id>', ReviewView.as_view()),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
