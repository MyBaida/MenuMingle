from django.urls import path
from core.views.user_views import *

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
