from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .serializers import AccountSerializer

User = get_user_model()


class AccountDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAdminUser]
