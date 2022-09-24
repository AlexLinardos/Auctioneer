from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Item, Bid
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

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createItemBid(request, pk):
    user = request.user
    item = Item.objects.get(id=pk)
    data = request.data

    #1 - bid isnt higher than highest bid
    currently = item.first_bid

    bidsExist = item.bid_set.filter().exists()
    item_bids = item.bid_set.all()
    item_bids.reverse()
        
    if len(item_bids) != 0:
        currently = item_bids[0].price
    

    if data['ammount'] <= currently:
        content = {'details': 'Bid ammount has to be greater than current ammount'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        

    #2 - create bid
    else:
        bid = Bid.objects.create(
        user=user,
        item=item,
        ammount=data['ammount'],
        )

        bids = item.bid_set.all()
        item.number_of_bids = len(bids)

        item.currently = data['ammount']

        item.save()

        return Response('Bid Placed')