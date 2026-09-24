import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaConciergeBell } from 'react-icons/fa';

const Header = () => {
  const [tableId, setTableId] = useState('');
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const count = cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;

  useEffect(() => {
    const id = localStorage.getItem('tableId');
    if (id) setTableId(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to={`/table/${tableId}`}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm text-white">
            S
          </span>
          Served
        </Link>

        <Link
          to={`/table/${tableId}/cart`}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50 hover:text-brand-600"
          aria-label="View your order"
        >
          <FaConciergeBell className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white shadow-sm">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
