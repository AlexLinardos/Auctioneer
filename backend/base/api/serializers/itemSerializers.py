from rest_framework import serializers
from django.contrib.auth.models import User
from ...models import Item, Bid, Category

from .userSerializers import UserSerializer

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
    
class ItemSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    bids = serializers.SerializerMethodField(read_only=True)
    categories = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Item
        fields = '__all__'

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

    def get_bids(self, obj):
        bids = obj.bid_set.all()
        serializer = BidSerializer(bids, many=True)
        return serializer.data

    def get_categories(self, obj):
        categories = obj.categories.all()
        serializer = CategorySerializer(categories, many=True)
        return serializer.data