import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsClockHistory, BsCheck2Circle, BsArrowRepeat, BsFire } from 'react-icons/bs';
import Loader from '../components/Loader';
import AdminLayout from '../components/AdminLayout';
import { apiUrl } from '../config';

const STATUS_META = {
  pending: { label: 'New', badge: 'bg-amber-50 text-amber-700 ring-amber-200' },
  preparing: { label: 'Preparing', badge: 'bg-brand-50 text-brand-700 ring-brand-200' },
  served: { label: 'Served', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
};

// mm:ss since the order was placed, plus a colour tier for urgency.
function waitInfo(createdAt, now) {
  const ms = Math.max(0, now - new Date(createdAt).getTime());
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const tone = mins >= 15 ? 'text-rose-600' : mins >= 5 ? 'text-amber-600' : 'text-emerald-600';
  return { label: `${mins}:${String(secs).padStart(2, '0')}`, tone };
}

function KitchenScreen() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.adminLogin.userInfo);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(apiUrl('/api/orders'));
      if (res.ok) setOrders(await res.json());
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auth guard + first load.
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders();
    } else {
      navigate('/admin/login');
    }
  }, [userInfo, navigate, fetchOrders]);

  // Poll for new orders (10s) and tick the wait-time clock (1s).
  useEffect(() => {
    const poll = setInterval(fetchOrders, 10000);
    const ticker = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(poll);
      clearInterval(ticker);
    };
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o))); // optimistic
    try {
      await fetch(apiUrl(`/api/orders/${id}/status/`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating order:', error);
      fetchOrders();
    }
  };

  const active = orders
    .filter((o) => o.status !== 'served')
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // longest waiting first
  const served = orders.filter((o) => o.status === 'served').slice(0, 8);

  const counts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    served: orders.filter((o) => o.status === 'served').length,
  };

  const summary = [
    { key: 'pending', label: 'New', icon: BsClockHistory, color: 'text-amber-600 bg-amber-50' },
    { key: 'preparing', label: 'Preparing', icon: BsFire, color: 'text-brand-600 bg-brand-50' },
    { key: 'served', label: 'Served', icon: BsCheck2Circle, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <AdminLayout
      title="Kitchen"
      action={
        <button className="btn-ghost" onClick={fetchOrders}>
          <BsArrowRepeat className="h-4 w-4" /> Refresh
        </button>
      }
    >
      {/* Summary */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {summary.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="card flex flex-col items-center gap-2 p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold leading-none text-slate-900 sm:text-2xl">{counts[key]}</p>
              <p className="mt-1 truncate text-xs font-medium text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live &middot; auto-refreshes every 10s
      </div>

      {loading ? (
        <Loader full />
      ) : active.length === 0 ? (
        <div className="panel py-16 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
            <BsCheck2Circle className="h-7 w-7" />
          </span>
          <p className="text-sm font-medium text-slate-700">All caught up</p>
          <p className="mt-1 text-sm text-slate-400">No active orders right now.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {active.map((order) => {
            const meta = STATUS_META[order.status] || STATUS_META.pending;
            const wait = waitInfo(order.createdAt, now);
            return (
              <article key={order._id} className="card flex flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Order #{order._id}</p>
                    <p className="text-xs capitalize text-slate-500">{order.table || '—'}</p>
                  </div>
                  <span className={`badge ring-1 ring-inset ${meta.badge}`}>{meta.label}</span>
                </div>

                <div className={`mb-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold ${wait.tone}`}>
                  <BsClockHistory className="h-4 w-4" />
                  {wait.label}
                  <span className="font-normal text-slate-400">waiting</span>
                </div>

                <ul className="mb-4 flex-1 space-y-1.5 border-t border-slate-100 pt-3">
                  {(order.orderItems || []).map((item, idx) => (
                    <li key={idx} className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="capitalize text-slate-700">
                        <span className="font-semibold text-slate-900">{item.qty}&times;</span> {item.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {order.status === 'pending' ? (
                  <button className="btn-primary w-full" onClick={() => updateStatus(order._id, 'preparing')}>
                    <BsFire className="h-4 w-4" /> Start Preparing
                  </button>
                ) : (
                  <button
                    className="btn w-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 focus:ring-emerald-500"
                    onClick={() => updateStatus(order._id, 'served')}
                  >
                    <BsCheck2Circle className="h-4 w-4" /> Mark Served
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Recently served */}
      {served.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Recently served
          </h2>
          <div className="table-wrap overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {served.map((order) => (
                  <tr key={order._id}>
                    <td className="font-medium text-slate-900">#{order._id}</td>
                    <td>
                      <span className="badge bg-slate-100 capitalize text-slate-600">{order.table || '—'}</span>
                    </td>
                    <td className="text-xs text-slate-500">
                      {(order.orderItems || [])
                        .map((i) => `${i.qty}× ${i.name}`)
                        .join(', ') || '—'}
                    </td>
                    <td className="text-right font-semibold text-slate-900">
                      GH&#8373;{Number(order.totalPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </AdminLayout>
  );
}

export default KitchenScreen;
