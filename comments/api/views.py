from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import CommentActionsSerializer, CommentUpdateSerializer

from comments.models import Comment


class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentActionsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentUpdate(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateSerializer
    permission_classes = [IsAuthenticated]

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentActionsSerializer
    permission_classes = [IsAuthenticated]

