import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import Header from '../components/Header';
import { BsBagX, BsTrash3, BsPlus, BsDash, BsArrowLeft } from 'react-icons/bs';
import { mediaUrl } from '../config';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [tableId, setTableId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const id = localStorage.getItem('tableId');
    if (id) setTableId(id);
  }, []);

  const orderHandler = () => {
    const tId = localStorage.getItem('tableId');
    if (subtotal !== 0) {
      dispatch(
        createOrder(
          {
            orderItems: cart.cartItems,
            itemPrice: subtotal.toFixed(2),
            totalPrice: Number(subtotal.toFixed(2)),
            table: tId,
          },
          navigate
        )
      );
    } else {
      window.alert('Cannot order 0 items');
    }
  };

  const returnHandler = () => navigate(`/table/${tableId}`);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <BsBagX className="h-8 w-8" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Your order is empty</h1>
              <p className="mt-1 text-sm text-slate-500">Browse the menu and add something tasty.</p>
            </div>
            <button className="btn-primary" onClick={returnHandler}>
              <BsArrowLeft className="h-4 w-4" /> Back to Menu
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Items */}
            <section>
              <h1 className="mb-4 text-2xl font-bold text-slate-900">Your Order</h1>
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li key={item.menuItem} className="card flex items-center gap-4 p-3">
                    <img
                      src={mediaUrl(item.image)}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold capitalize text-slate-900">{item.name}</h3>
                      <p className="mt-0.5 text-sm font-medium text-brand-600">GH₵{Number(item.price).toFixed(2)}</p>

                      <div className="mt-2 inline-flex items-center rounded-lg ring-1 ring-inset ring-slate-200">
                        <button
                          className="btn-icon h-8 w-8 text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-300 disabled:opacity-40 disabled:hover:bg-transparent"
                          onClick={() => item.qty > 1 && dispatch(addToCart(item.menuItem, -1))}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <BsDash className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.qty}</span>
                        <button
                          className="btn-icon h-8 w-8 text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-300"
                          onClick={() => dispatch(addToCart(item.menuItem, 1))}
                          aria-label="Increase quantity"
                        >
                          <BsPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        GH₵{(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        className="btn-icon h-8 w-8 text-slate-400 hover:bg-rose-50 hover:text-rose-500 focus:ring-rose-300"
                        onClick={() => dispatch(removeFromCart(item.menuItem))}
                        aria-label={`Remove ${item.name}`}
                      >
                        <BsTrash3 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="panel">
                <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Items</dt>
                    <dd className="font-medium text-slate-800">{itemCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Subtotal</dt>
                    <dd className="font-medium text-slate-800">GH₵{subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
                    <dt className="font-semibold text-slate-900">Total</dt>
                    <dd className="font-bold text-slate-900">GH₵{subtotal.toFixed(2)}</dd>
                  </div>
                </dl>
                <button className="btn-primary mt-5 w-full" onClick={orderHandler}>
                  Place Order
                </button>
                <button className="btn-ghost mt-2 w-full" onClick={returnHandler}>
                  <BsArrowLeft className="h-4 w-4" /> Continue Browsing
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
