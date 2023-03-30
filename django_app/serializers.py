from django.contrib.auth.models import User
from rest_framework import serializers
from django_app import models as django_models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ImageModelSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = django_models.ImageModel
        fields = '__all__'

    def get_author(self, obj):
        # return UserSerializer(instance=obj.author, many=False).data
        username = "unknown"
        if obj.author is not None:
            username = obj.author.username
        return {"username": username}
