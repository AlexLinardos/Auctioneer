from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.getUsers, name='users'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/profile/update/', views.updateUserProfile, name='users-profile-update'),
    path('users/<str:pk>/', views.getUserById, name='user-by-id'),
    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('users/update/<str:pk>/', views.updateUser, name='user-update'),
]