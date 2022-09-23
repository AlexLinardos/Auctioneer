from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('items/', views.getItems, name="items"),
    path('items/<str:pk>', views.getItem, name="item"),
]