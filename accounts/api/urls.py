from django.urls import path
from .views import AccountDetail, AccountsList, AccountsUpdateView, AccountsCraeteView, AccountsDeleteView

urlpatterns = [
    path('accounts/', AccountsList.as_view(), name="accounts"),
    path('account/<username>/', AccountDetail.as_view(), name="account-detail"),
    path('account/<username>/update/', AccountsUpdateView.as_view(), name="update-account"),
    path('account/<username>/delete/', AccountsDeleteView.as_view(), name="delete-account"),
    path('create/', AccountsCraeteView.as_view(), name="account-create-2")
]
