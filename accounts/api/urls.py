from django.urls import path
from .views import AccountDetail

urlpatterns = [
    path('account/<pk>/', AccountDetail.as_view(), name="account-detail")
]
