from rest_framework import serializers
from django.contrib.auth.models import User
from ...models import Item, Bid

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'
    
    

class ItemSerializer(serializers.ModelSerializer):
    bids = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Item
        fields = '__all__'

    def get_bids(self, obj):
        bids = obj.bid_set.all()
        serializer = BidSerializer(bids, many=True)
        return serializer.data