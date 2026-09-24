import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/adminActions.js';
import { apiUrl } from '../config';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsReceipt,
  BsBoxArrowRight,
  BsX,
  BsEye,
  BsFire,
} from 'react-icons/bs';

const navItems = [
  { to: '/admin/dashboard', label: 'Appearance', icon: BsGrid1X2Fill },
  { to: '/admin/kitchen', label: 'Kitchen', icon: BsFire, badge: true },
  { to: '/admin/menuItemlist', label: 'Menu Items', icon: BsFillArchiveFill },
  { to: '/admin/categorylist', label: 'Categories', icon: BsFillGrid3X3GapFill },
  { to: '/admin/tablelist', label: 'Tables', icon: BsPeopleFill },
  { to: '/admin/orderlist', label: 'Orders', icon: BsReceipt },
];

function Sidebar({ open, onClose }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.adminLogin.userInfo);
  const [pendingCount, setPendingCount] = useState(0);

  // Poll for fresh (pending) orders so the Kitchen badge stays current.
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(apiUrl('/api/orders'));
        if (res.ok) {
          const data = await res.json();
          const count = data.filter((o) => o.status === 'pending').length;
          if (mounted) setPendingCount(count);
        }
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };
    load();
    const timer = setInterval(load, 15000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    if (onClose) onClose();
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-500/10 text-brand-600'
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-100'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 px-3 py-4 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
              S
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">Served</p>
              <p className="text-xs text-slate-400">
                {userInfo && userInfo.name ? userInfo.name : 'Admin'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <BsX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon className="h-5 w-5" />
              <span className="flex-1">{label}</span>
              {badge && pendingCount > 0 && (
                <span className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[11px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </NavLink>
          ))}

          <NavLink to="/admin/home" className={linkClass} onClick={onClose}>
            <BsEye className="h-5 w-5" />
            Preview Site
          </NavLink>
        </nav>

        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            onClick={logoutHandler}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
          >
            <BsBoxArrowRight className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
