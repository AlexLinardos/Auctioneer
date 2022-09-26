from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ...models import Item, Bid
from base.api.serializers.itemSerializers import ItemSerializer
from decimal import *

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

@api_view(['DELETE'])
def deleteItem(request, pk):
    item = Item.objects.get(_id=pk)
    item.delete()
    return Response('Item Deleted')

@api_view(['POST'])
def createItem(request):
    user = request.user

    item = Item.objects.create(
        # user=user,
        name='Sample Name',
        first_bid=0,
        brand='Sample Brand',
        category='Sample Category',
        description=''
    )

    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateItem(request, pk):
    data = request.data
    item = Item.objects.get(id=pk)

    item.name = data['name']
    item.currently = data['currently']
    item.brand = data['brand']
    item.category = data['category']
    item.description = data['description']

    item.save()

    serializer = ItemSerializer(item, many=False)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def placeItemBid(request, pk):
    user = request.user
    item = Item.objects.get(_id=pk)
    data = request.data

    # 1 - bid isnt higher than highest bid

    if  float(data['ammount']) <= item.currently:
        content = {'detail': 'Bid ammount has to be greater than the highest bid!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        

    #2 - create bid
    else:
        bid = Bid.objects.create(
        user=user,
        item=item,
        name=user.first_name,
        ammount=data['ammount'],
        )

        bids = item.bid_set.all()
        item.number_of_bids = len(bids)

        item.currently = data['ammount']

        item.save()

        return Response('Bid Placed')