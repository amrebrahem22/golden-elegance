from django.db import models
from django.db.models.signals import post_save, pre_save
from django.conf import settings
from django.core.exceptions import ValidationError
from comments.models import Comment
from goldenElegance.utils import unique_slug_generator
import os
import random

User = settings.AUTH_USER_MODEL


def validate_uploaded_file(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.mp4', '.flv', 'webm', 'avi',
                        '.mov', '.m4p', '.png', '.jpeg', '.jpg', '.gif']

    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
    else:
        return value


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(
        new_filename=new_filename, ext=ext)
    return "posts/{new_filename}/{final_filename}".format(
        new_filename=new_filename,
        final_filename=final_filename
    )


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(blank=True)
    caption = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(
        User, related_name="likes", blank=True)
    shares = models.ManyToManyField(
        User, related_name="shares", blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

    # get the post comments
    @property
    def comments(self):
        instance = self
        qs = Comment.objects.filter_by_instance(instance)
        return qs

    # get Content type for the post
    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type

    @property
    def get_images(self):
        return PostImage.objects.filter(post=self)


def pre_save_post_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


pre_save.connect(pre_save_post_slug, sender=Post)


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to=upload_image_path,
                            validators=[validate_uploaded_file])
    is_image = models.BooleanField(default=False)
    is_video = models.BooleanField(default=False)

    def __str__(self):
        return self.post.user.username


def pre_save_post_image(sender, instance, *args, **kwargs):
    if instance.file:
        ext = os.path.splitext(instance.file.name)[1]
        video_extensions = ['.mp4', '.flv', 'webm', 'avi', '.mov', '.m4p']
        images_extensions = ['.png', '.jpeg', '.jpg', '.gif']

        if ext.lower() in video_extensions:
            instance.is_video = True
        elif ext.lower() in images_extensions:
            instance.is_image = True


pre_save.connect(pre_save_post_image, sender=PostImage)
