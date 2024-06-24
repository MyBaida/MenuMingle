from django.urls import path
from core.views.menuItem_views import *

urlpatterns = [
    path('', getMenuItems, name='products'),

    path('tables/', getTables, name='tables'),
    path('update-card-type/', update_card_type_setting, name='update-card-type-setting'),

    path('create/', createMenuItem, name='menuItem-create'),
    path('table/create/', createTable, name='table-create'),
    path('upload/', uploadImage, name='image-upload'),

    # path('create-upload/', createUploadImage, name='menu-item-image-upload'),

    path('<str:pk>/', getMenuItem, name='menuItem'),

    path('table/<str:pk>/', getTable, name='table'),
    path('table/update/<str:pk>/', updateTable, name='table-update'),
    path('table/delete/<str:pk>/', deleteTable, name='table-delete'),

    path('update/<str:pk>/', updateMenuItem, name='menuItem-update'),
    path('delete/<str:pk>/', deleteMenuItem, name='menuItem-delete'),

]
