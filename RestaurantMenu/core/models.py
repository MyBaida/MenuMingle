from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    


class MenuItem(models.Model):
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    name = models.CharField(max_length=50, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    card_type = models.CharField(max_length=10, choices=(("round", "Round"), ("square", "Square")), default="square")
    cooking_duration = models.CharField(max_length=10, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    

class Table(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Order(models.Model):
    table = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)
    

class OrderItem(models.Model):
    menuItem = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)