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


class AccountSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['email', 'username', 'active', 'profile']

    def get_profile(self, obj):
        return ProfileSerializer(obj.profile).data
