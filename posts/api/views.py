from rest_framework import generics, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, PostImageField
from posts.models import Post, PostImage


class PostImageCreateView(generics.CreateAPIView):
    queryset = PostImage.objects.all()
    serializer_class = PostImageField
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class PostImageUpdateView(generics.UpdateAPIView):
    queryset = PostImage.objects.all()
    serializer_class = PostImageField
    permission_classes = [IsAuthenticated]


class PostImageDeleteView(generics.DestroyAPIView):
    queryset = PostImage.objects.all()
    serializer_class = PostImageField
    permission_classes = [IsAuthenticated]


class PostsListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


class PostsDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


class PostsCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostsUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = []

    def perform_update(self, serializer):
        serializer.save(instance=self.get_object())


class PostsDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
