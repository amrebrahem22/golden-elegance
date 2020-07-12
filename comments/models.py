from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from posts.models import Post


class CommentManager(models.Manager):
    def filter_by_instance(self, instance):
        # get the post model
        content_type = ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        # this super is to get access to the comment class
        qs = super(CommentManager, self).filter(
            content_type=content_type, object_id=obj_id)
        return qs


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             default=1, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()

    objects = CommentManager()

    def __str__(self):
        return '{} - ({})'.format(self.text, self.user.username)
