import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaConciergeBell } from 'react-icons/fa';

// Sticky bottom bar (small screens only) summarising the current order so
// customers can jump straight to "Your Order" while browsing the menu.
const MobileOrderBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const tableId = localStorage.getItem('tableId') || '';

  const count = (cartItems || []).reduce((acc, item) => acc + item.qty, 0);
  const total = (cartItems || []).reduce((acc, item) => acc + item.qty * item.price, 0);

  if (!count) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <Link to={`/table/${tableId}/cart`} className="btn-primary w-full">
        <FaConciergeBell className="h-4 w-4" />
        <span className="truncate">
          View Your Order &middot; {count} {count === 1 ? 'item' : 'items'} &middot; GH&#8373;
          {total.toFixed(2)}
        </span>
      </Link>
    </div>
  );
};

export default MobileOrderBar;
