from django.urls import path
from .views import (
    PostsListView,
    PostsDetailView,
    PostsCreateView,
    PostsUpdateView,
    PostsDeleteView,
    PostImageCreateView,
    PostImageUpdateView,
    PostImageDeleteView
)

urlpatterns = [
    path('', PostsListView.as_view(), name="post-list"),
    path('create/', PostsCreateView.as_view(), name="post-create"),
    path('<pk>/', PostsDetailView.as_view(), name="post-detail"),
    path('<pk>/update/', PostsUpdateView.as_view(), name="post-update"),
    path('<pk>/delete/', PostsDeleteView.as_view(), name="post-delete"),
    path('image/create/', PostImageCreateView.as_view(), name="post-image-create"),
    path('image/<pk>/update/', PostImageUpdateView.as_view(),
         name="post-image-update"),
    path('image/<pk>/delete/', PostImageDeleteView.as_view(),
         name="post-image-delete"),
]
