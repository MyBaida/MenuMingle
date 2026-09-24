import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { BsList, BsArrowLeftShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';

/**
 * Shared admin shell: fixed sidebar (drawer on mobile) + sticky topbar + content.
 * `title`  – page heading
 * `action` – optional node rendered on the right of the header (e.g. "New" button)
 * `backTo` – optional path; renders a back arrow linking to it
 */
const AdminLayout = ({ title, action, backTo, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <BsList className="h-5 w-5" />
            </button>

            {backTo && (
              <Link
                to={backTo}
                className="hidden items-center gap-1 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700 sm:flex"
                aria-label="Go back"
              >
                <BsArrowLeftShort className="h-6 w-6" />
              </Link>
            )}

            <h1 className="flex-1 truncate text-lg font-semibold text-slate-900">{title}</h1>

            {action}
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
