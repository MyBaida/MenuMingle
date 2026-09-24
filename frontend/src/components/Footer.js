import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 px-4 py-6 text-center text-sm text-slate-400 sm:px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} Served &middot; Powered by iBit Soft Interns
        </p>
        <Link
          to="/admin/login"
          className="text-xs font-medium text-slate-500 transition hover:text-brand-600"
        >
          Admin login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
