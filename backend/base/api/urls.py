from django.urls import path
from . import views

from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/', views.getUsers, name='users'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile/update/', views.updateUserProfile, name='users-profile-update'),
]