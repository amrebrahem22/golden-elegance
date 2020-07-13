from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.db.models.signals import post_save


def username_validation(value):
    if ' ' in value:
        raise ValidationError(
            "Username can't conatin Spaces, and must be Unique.")
    return value


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        if not username:
            raise ValueError('Users must have an username address')

        qs = User.objects.filter(
            Q(email=email) |
            Q(username=username)
        )
        if qs.exists():
            raise ValueError('User Already Exists.')
        else:
            user = self.model(
                username=username,
                email=self.normalize_email(email),
            )

            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_staffuser(self, username, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            username,
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            username,
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username = models.CharField(
        max_length=255, validators=[username_validation])
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser

    USERNAME_FIELD = 'email'
    # Email & Password are required by default.
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active


class UserProfileManager(models.Manager):
    use_for_related_fields = True

    def all(self):
        qs = self.get_queryset().all()
        try:
            if self.instance:
                qs = qs.exclude(user=self.instance)
        except:
            pass
        return qs

    def count(self):
        qs = self.get_queryset().all()
        try:
            if self.instance:
                qs = qs.exclude(user=self.instance)
        except:
            pass
        return qs.count()


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile", default=1)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    avatar = models.ImageField(blank=True, null=True)
    description = models.TextField()
    verified = models.BooleanField(default=False)
    following = models.ManyToManyField(
        User, related_name='followers', blank=True)
    date_join = models.DateTimeField(auto_now_add=True)

    objects = UserProfileManager()

    def __str__(self):
        return '{} - {}'.format(self.user.username, self.following.all().count())

    def get_following(self):
        qs = self.following.all()
        return qs.exclude(username=self.user.username)

    def get_followers(self):
        qs = self.user.followers.all()
        return qs.exclude(user=self.user)


def post_save_create_profile(sender, instance, created, *args, **kwargs):
    if created:
        user = Profile.objects.create(user=instance)
        user.save()


post_save.connect(post_save_create_profile, sender=User)
