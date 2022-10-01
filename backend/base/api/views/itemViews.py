from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from ...models import Item, Bid, Category
from base.api.serializers.itemSerializers import ItemSerializer, CategorySerializer
from base.api.serializers.userSerializers import UserSerializer
from decimal import *

# @api_view(['GET'])
# def getCategories(request):
#     categories = Category.objects.all()
#     serializer = CategorySerializer(categories, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def getItems(request):
    cur_user=request.user
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    
    flag = request.query_params.get('flag')
    if flag == 'Active':
        items = Item.objects.filter(status='Active')
        items = items.filter(name__icontains=query)
    elif flag == 'Sell':
        items = Item.objects.filter(user=cur_user.id)
        items = items.filter(name__icontains=query)
    else:
        items = Item.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(items, 2)

    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        items = paginator.page(1)
    except EmptyPage:
        items = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)

    serializer = ItemSerializer(items, many=True)
    return Response({'items': serializer.data, 'page':page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getItem(request, pk):
    item = Item.objects.get(_id=pk)
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)

# @api_view(['GET'])
# def getUser(request, pk):
#     item = Item.objects.get(_id=pk)
#     user = User.objects.get(id=item.user.id)
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)


@api_view(['DELETE'])
def deleteItem(request, pk):
    item = Item.objects.get(_id=pk)
    item.delete()
    return Response('Item Deleted')

@api_view(['POST'])
def createItem(request):
    user = request.user

    item = Item.objects.create(
        user=user,
        status='Not Started',
        # name='Sample Name',
        # first_bid=0,
        # brand='Sample Brand',
        # category='Sample Category',
        # description=''
    )

    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateItem(request, pk):
    data = request.data
    item = Item.objects.get(_id=pk)

    if "status" in data:
        item.status = data['status']

        item.save()

        serializer = ItemSerializer(item, many=False)
        return Response(serializer.data)
    else:

        item.name = data['name']
        item.first_bid = data['first_bid']

        if  float(data['first_bid']) <= 0:
            content = {'detail': 'Please set a First Bid price for your item!'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        else:   
            if data['buy_price'] is not None:
                item.buy_price = data['buy_price']
            item.brand = data['brand']

            if "categories" in data:
                item.categories.clear()
                for category in data['categories']:
                    item.categories.add(Category.objects.get(name=category['label']))
            item.description = data['description']
            item.saved = True

            item.save()

            serializer = ItemSerializer(item, many=False)
            return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    item_id = data['item_id']
    item = Item.objects.get(_id=item_id)

    item.image = request.FILES.get('image')
    item.save()

    return Response('Image was uploaded')

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def placeItemBid(request, pk):
    user = request.user
    item = Item.objects.get(_id=pk)
    data = request.data

    if (item.currently!=None):
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

            item.currently = float(data['ammount'])

            item.save()

            return Response('Bid Placed')
    else:
        bid = Bid.objects.create(
        user=user,
        item=item,
        name=user.first_name,
        ammount=data['ammount'],
        )
        bids = item.bid_set.all()
        item.number_of_bids = len(bids)
        item.currently = float(data['ammount'])
        item.save()
        return Response('Bid Placed')
