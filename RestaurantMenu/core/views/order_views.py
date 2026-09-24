from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser 

from core.models import MenuItem, Order, OrderItem, Table
from core.serializers import OrderSerializer

from rest_framework import status
from datetime import datetime


# @api_view(['POST'])
# def addOrderItems(request):
#     data = request.data

#     orderItems = data['orderItems']

#     if orderItems and len(orderItems) == 0:
#         return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
#     else:
#         #Create Order
#         order = Order.objects.create(
#             table = data['table'],
#             totalPrice = data['totalPrice'],
#         )

#         #create order items

#         for i in orderItems:
#             menuItem = MenuItem.objects.get(_id=i['menuItem'])

#             item = OrderItem.objects.create(
#                 menuItem = menuItem,
#                 order = order,
#                 name = menuItem.name,
#                 qty = i['qty'],
#                 price = i['price'],
#                 image = menuItem.image.url,
#             )
#             #update stock
#             # menuItem.save()

#         serializer = OrderSerializer(order, many=False)
#         return Response(serializer.data)

@api_view(['POST'])
def addOrderItems(request):
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        # Fetch the Table instance based on the table name
        table_id = data['table']
        try:
            table = Table.objects.get(_id=table_id)
        except Table.DoesNotExist:
            return Response({'detail':'Table does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        # Create Order
        order = Order.objects.create(
            table=table,
            totalPrice=data['totalPrice'],
        )

        # Create OrderItems
        for i in orderItems:
            menuItem = MenuItem.objects.get(_id=i['menuItem'])

            item = OrderItem.objects.create(
                menuItem=menuItem,
                order=order,
                name=menuItem.name,
                qty=i['qty'],
                price=i['price'],
                image=menuItem.image.url,
            )
            # Update stock
            # menuItem.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)




@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
# @permission_classes([IsAdminUser])
def updateOrderStatus(request, pk):
    try:
        order = Order.objects.get(_id=pk)
    except Order.DoesNotExist:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get('status')
    if new_status not in ('pending', 'preparing', 'served'):
        return Response({'detail': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

    order.status = new_status
    order.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)