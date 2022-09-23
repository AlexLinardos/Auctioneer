from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Item
from .items import items
from .serializers import ItemSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/items/',
        '/api/items/create/',

        '/api/items/upload/',

        '/api/items/top/',
        '/api/items/<id>/',

        '/api/items/delete/<id>/',
        '/api/items/<update>/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getItems(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getItem(request, pk):
    item = Item.objects.get(_id=pk)
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)
