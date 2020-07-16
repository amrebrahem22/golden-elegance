from django.urls import path
from .views import CommentCreate, CommentUpdate, CommentDelete

urlpatterns = [
    path('create/', CommentCreate.as_view(), name="create-comment"),
    path('<pk>/update/', CommentUpdate.as_view(), name="update-comment"),
    path('<pk>/delete/', CommentDelete.as_view(), name="delete-comment"),
]
