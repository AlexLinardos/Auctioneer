from rest_framework import serializers
from ...models import Recommendation
from .userSerializers import ProfileSerializer
from .itemSerializers import ItemSerializer

class RecommendationSerializer(serializers.ModelSerializer):
    profileObj = ProfileSerializer(source='profile', read_only=True)
    itemObj = ItemSerializer(source='item', read_only=True)

    class Meta:
        model = Recommendation
        fields = '__all__'