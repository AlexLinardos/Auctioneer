from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, Http404
from rest_framework import status
import logging
from ..XML import itemsXML, XMLupload
from pathlib import Path

from base.api.serializers.otherSerializers import  RecommendationSerializer
from ...models import Recommendation, Item, Profile, FileUpload

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

@api_view(['GET'])
def getXMLExport(request):
    itemsXML()
    return Response('XML EXPORT')

@api_view(['POST'])
def getXMLImport(request):
    file_req = request.FILES.get('XMLfile')
    fileupload = FileUpload.objects.create(file=file_req)
    XMLupload(str(file_req), request.user)
    return Response('File uploaded')