from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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

