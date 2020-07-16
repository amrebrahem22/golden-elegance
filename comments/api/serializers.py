from rest_framework import serializers

from comments.models import Comment
from posts.models import Post
from accounts.api.serializers import AccountUserLessDataSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = AccountUserLessDataSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text']


class CommentActionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'object_id', 'text']

    def create(self, validated_data):
        content_type = validated_data.get("object_id")
        Instance = Post.objects.get(id=content_type) if Post.objects.filter(
            id=content_type).count() > 0 else None

        if Instance is not None:
            contentType = Instance.get_content_type
            if contentType is not None:
                validated_data["content_type"] = contentType
                validated_data["object_id"] = Instance.id
        return super(CommentSerializer, self).create(validated_data)


class CommentUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['text']

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.object_id = validated_data.get(
            'object_id', instance.object_id)
        instance.save()
        return instance
