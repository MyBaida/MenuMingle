from django.urls import path
from core.views.order_views import *

urlpatterns = [

    path('', getOrders, name='orders'),
    path('add/', addOrderItems, name='orders-add'),

]
