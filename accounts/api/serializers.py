from rest_framework import serializers

from accounts.models import User, Profile


class FollowersField(serializers.Serializer):
    followers_count = serializers.IntegerField()


class ProfileSerializer(serializers.ModelSerializer):
    following = serializers.StringRelatedField(many=True)
    followers = serializers.SerializerMethodField()
    followers_count = serializers.IntegerField(
        source='user.followers.count',
        read_only=True
    )
    following_count = serializers.IntegerField(
        source='following.all.count',
        read_only=True
    )

    class Meta:
        model = Profile
        fields = '__all__'

    def get_followers(self, obj):
        return ProfileSerializer(obj.get_followers(), many=True).data


class ProfileLessDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar']


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'avatar', 'description']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'avatar', 'description']


class AccountUserLessDataSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'active', 'profile']

    def get_profile(self, obj):
        return ProfileLessDataSerializer(obj.profile).data


class AccountSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'active', 'profile']

    def get_profile(self, obj):
        return ProfileSerializer(obj.profile).data


class AccountUserLessCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(required=False)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'active', 'profile']

    def create(self, validated_data):
        profile = validated_data.pop('profile', None)
        first_name = profile.pop('first_name', None)
        last_name = profile.pop('last_name', None)
        avatar = profile.pop('avatar', None)
        description = profile.pop('description', None)
        user = User.objects.create(**validated_data)
        p = Profile.objects.get(user=user)
        p.first_name = first_name
        p.last_name = last_name
        p.avatar = avatar
        p.description = description
        p.save()
        return User.objects.get(id=user.id)

    def update(self, instance, validated_data):
        username = validated_data.pop('username', instance.username)
        email = validated_data.pop('email', instance.email)
        profile = validated_data.pop('profile', instance.profile)
        first_name = profile.pop('first_name', instance.profile.first_name)
        last_name = profile.pop('last_name', instance.profile.last_name)
        avatar = profile.pop('avatar', instance.profile.avatar)
        description = profile.pop('description', instance.profile.description)
        user = User.objects.get(id=instance.id)
        user.username = username
        user.email = email
        user.save()
        p = Profile.objects.get(user=user)
        p.first_name = first_name
        p.last_name = last_name
        p.avatar = avatar
        p.description = description
        p.save()
        return User.objects.get(id=user.id)
