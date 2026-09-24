import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/adminActions';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// Published demo credentials so visitors can explore the admin panel.
const DEMO_EMAIL = 'admin@served.com';
const DEMO_PASSWORD = 'served123';

function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { error, loading, userInfo } = adminLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-lg font-bold text-white">
            S
          </span>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage your restaurant</p>
        </div>

        <div className="card p-6">
          {error && (
            <div className="mb-4">
              <Message variant="danger">{error}</Message>
            </div>
          )}
          {loading && <Loader />}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                required
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <BsEyeSlash className="h-4 w-4" /> : <BsEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Log In
            </button>
          </form>

          <div className="mt-5 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs font-medium text-slate-500">Testing the demo?</p>
            <p className="mt-1 text-xs text-slate-400">
              Sign in with{' '}
              <code className="font-semibold text-brand-600">{DEMO_EMAIL}</code> /{' '}
              <code className="font-semibold text-brand-600">{DEMO_PASSWORD}</code>
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2 text-xs font-semibold text-brand-600 hover:underline"
            >
              Fill demo credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
