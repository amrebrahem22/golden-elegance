from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from .serializers import AccountSerializer, ProfileCreateSerializer, AccountUserLessCreateSerializer
from accounts.models import Profile

User = get_user_model()


class AccountDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]


class AccountsCraeteView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AccountUserLessCreateSerializer
    permission_classes = [IsAuthenticated]


class AccountsUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = AccountUserLessCreateSerializer
    permission_classes = [IsAuthenticated]


class AccountsDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AccountUserLessCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        instance.delete()


class AccountsList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        qs = User.objects.all()
        query = self.request.GET.get('q') or None
        if query is not None:
            return qs.filter(
                Q(username=query) |
                Q(email=query)
            )
        return qs


# class UserDetailView(DetailView):
# 	queryset = User.objects.all()
# 	template_name = 'tweet.html'
# 	def get_object(self):
# 		return get_object_or_404(User, username__iexact=self.kwargs.get('username'))
# 	def get_context_data(self, *args, **kwargs):
# 		context = super(UserDetailView, self).get_context_data(*args, **kwargs)
# 		context['following'] = UserProfile.objects.is_following(self.request.user, self.get_object())
# 		return context

# class UserFollow(View):
# 	def get(self, request, username, *args, **kwargs):
# 		user_qs = get_object_or_404(User, username__iexact=username)
# 		if request.user.is_authenticated:
# 			is_following = UserProfile.objects.toggle_follow(request.user, user_qs)
# 		return redirect('accounts:profile', username=username)
