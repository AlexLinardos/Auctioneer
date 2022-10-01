from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import logging

from base.api.serializers.otherSerializers import  RecommendationSerializer
from ...models import Recommendation, Item, Profile

@api_view(['GET'])
def getProfileRecommends(request, pk):
    recommends = Recommendation.objects.filter(profile=pk)
    serializer = RecommendationSerializer(recommends, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def markVisit(request, ppk, ipk):
    profile = Profile.objects.get(id=ppk)
    item = Item.objects.get(_id=ipk)
    profile.visits.add(item)
    return Response('Item visited')