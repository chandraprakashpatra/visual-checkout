# users/urls.py

from django.urls import path
from .views import UserRegistrationView
from .views import UserLoginView
from .views import UserSearchView

#this is for authentic req after login only

urlpatterns = [
    
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('search/', UserSearchView.as_view(), name='user-search'),
]
