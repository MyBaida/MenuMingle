import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import AdminLayout from '../components/AdminLayout';
import { apiUrl, mediaUrl } from '../config';

const STATUS_BADGE = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  preparing: 'bg-brand-50 text-brand-700 ring-brand-200',
  served: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

function OrderListScreen() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.adminLogin.userInfo);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl('/api/orders'));
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders();
    } else {
      navigate('/admin/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userInfo]);

  return (
    <AdminLayout title="Orders">
      {loading ? (
        <Loader full />
      ) : orders.length === 0 ? (
        <div className="panel py-16 text-center text-sm text-slate-400">No orders yet.</div>
      ) : (
        <div className="table-wrap overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Table</th>
                <th>Status</th>
                <th>Items</th>
                <th>Date</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-medium text-slate-900">#{order._id}</td>
                  <td>
                    <span className="badge bg-slate-100 capitalize text-slate-600">{order.table}</span>
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ring-1 ring-inset ${
                        STATUS_BADGE[order.status] || STATUS_BADGE.pending
                      }`}
                    >
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    {order.orderItems.length === 0 ? (
                      <span className="text-slate-400">Empty</span>
                    ) : (
                      <ul className="space-y-1.5">
                        {order.orderItems.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <img
                              src={mediaUrl(item.image)}
                              alt={item.name}
                              className="h-8 w-8 shrink-0 rounded-md object-cover ring-1 ring-slate-100"
                            />
                            <span className="text-xs text-slate-600">
                              <span className="font-medium capitalize text-slate-800">{item.name}</span>
                              {' · '}
                              {item.qty} × GH₵{Number(item.price).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="whitespace-nowrap text-xs text-slate-500">
                    {order.createdAt ? order.createdAt.substring(0, 10) : '—'}
                    <span className="block text-slate-400">
                      {order.createdAt ? order.createdAt.substring(11, 16) : ''}
                    </span>
                  </td>
                  <td className="text-right font-semibold text-slate-900">
                    GH₵{Number(order.totalPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default OrderListScreen;
