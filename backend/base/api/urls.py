from django.urls import path
from .views import itemViews, userViews

urlpatterns = [
    path('users/', userViews.getUsers, name='users'),
    path('users/login/', userViews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', userViews.registerUser, name='register'),
    path('users/profile/', userViews.getUserProfile, name='users-profile'),
    path('users/profile/update/', userViews.updateUserProfile, name='users-profile-update'),
    path('users/<str:pk>/', userViews.getUserById, name='user-by-id'),
    path('users/delete/<str:pk>/', userViews.deleteUser, name='user-delete'),
    path('users/update/<str:pk>/', userViews.updateUser, name='user-update'),

    path('items/', itemViews.getItems, name="items"),
    path('items/create/', itemViews.createItem, name="item-create"),
    path('items/update/<str:pk>/', itemViews.updateItem, name="item-update"),
    path('items/delete/<str:pk>/', itemViews.deleteItem, name="item-delete"),
    path('items/<str:pk>/', itemViews.getItem, name="item"),
    

    path('items/<str:pk>/bids/', itemViews.placeItemBid, name="place-bid"),
]