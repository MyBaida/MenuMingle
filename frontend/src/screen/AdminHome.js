import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMenuItems } from '../actions/menuItemActions';
import SquareCard from '../components/SquareCard';
import RoundCard from '../components/RoundCard';
import Footer from '../components/Footer';
import { BsArrowRight } from 'react-icons/bs';

const AdminHome = () => {
  const dispatch = useDispatch();
  const menuItemList = useSelector((state) => state.menuItemList);
  const { menuItems } = menuItemList;

  useEffect(() => {
    dispatch(listMenuItems());
  }, [dispatch]);

  const isRound = menuItems && menuItems.length > 0 && menuItems[0].card_type !== 'square';
  const gridClass = isRound
    ? 'grid-cols-1 lg:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/admin/home" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm text-white">S</span>
            Served
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">Preview</span>
          </Link>
          <Link to="/admin/dashboard" className="btn-ghost">
            Admin Panel <BsArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {!menuItems || menuItems.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-400">No menu items yet.</p>
        ) : (
          <div className={`grid gap-5 ${gridClass}`}>
            {menuItems.map((menuItem) =>
              menuItem.card_type === 'square' ? (
                <SquareCard key={menuItem._id} menuItem={menuItem} />
              ) : (
                <RoundCard key={menuItem._id} menuItem={menuItem} />
              )
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminHome;
