from rest_framework import serializers
from accounts.api.serializers import AccountSerializer, AccountUserLessDataSerializer
from posts.models import Post, PostImage
from comments.models import Comment
from comments.api.serializers import CommentSerializer


class PostImageField(serializers.ModelSerializer):

    class Meta:
        model = PostImage
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    user = AccountSerializer(read_only=True)
    likes = AccountUserLessDataSerializer(many=True, read_only=True)
    shares = AccountUserLessDataSerializer(many=True, read_only=True)
    files = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_files(self, obj):
        return PostImageField(obj.get_images, many=True).data

    def get_comments(self, obj):
        return CommentSerializer(obj.comments, many=True).data

