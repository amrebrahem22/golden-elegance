from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from .models import Post, PostImage
from comments.models import Comment


class CommentInlineAdmin(GenericTabularInline):
    model = Comment
    extra = 1


class PostImageAdmin(admin.TabularInline):
    model = PostImage
    extra = 1


class PostAdmin(admin.ModelAdmin):
    list_display = ['caption', 'timestamp']
    inlines = [PostImageAdmin, CommentInlineAdmin]

    class Meta:
        model = Post
        fields = '__all__'


admin.site.register(Post, PostAdmin)
admin.site.register(PostImage)
