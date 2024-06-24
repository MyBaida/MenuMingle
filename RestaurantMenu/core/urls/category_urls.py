from django.urls import path
from core.views.category_views import *

urlpatterns = [
    path('', getCategories, name='categories'),

    path('create/', createCategory, name='category-create'),

    path('<str:pk>/', getCategory, name='category'),
    path('<str:pk>/menuItems/', getCategoryMenuItems, name='category-menuItems'),

    path('update/<str:pk>/', updateCategory, name='category-update'),
    path('delete/<str:pk>/', deleteCategory, name='category-delete'),

    
]