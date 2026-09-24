import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../components/AdminLayout';
import CardStyling from './Styling';

const presets = ['#f8fafc', '#fbf5f0', '#f0fdf4', '#eff6ff', '#fdf2f8', '#fefce8'];

const AdminDashboard = ({ onChange }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const handleColorChange = (event) => {
    onChange(event.target.value);
  };

  const current = localStorage.getItem('backgroundColor') || '#f8fafc';

  return (
    <AdminLayout title="Appearance">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <h2 className="text-base font-semibold text-slate-900">Menu card style</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500">
            Choose how dishes are displayed to customers.
          </p>
          <CardStyling />
        </section>

        <section className="panel">
          <h2 className="text-base font-semibold text-slate-900">Background colour</h2>
          <p className="mb-4 mt-1 text-sm text-slate-500">
            Set the site-wide background tint.
          </p>

          <div className="flex items-center gap-4">
            <input
              type="color"
              aria-label="Custom background colour"
              defaultValue={current}
              onChange={handleColorChange}
              className="h-12 w-16 cursor-pointer rounded-lg border-0 bg-white p-1 ring-1 ring-inset ring-slate-200"
            />
            <code className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600">{current}</code>
          </div>

          <div className="mt-5">
            <p className="label">Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange(color)}
                  className="h-9 w-9 rounded-lg ring-1 ring-inset ring-slate-200 transition hover:scale-110"
                  style={{ backgroundColor: color }}
                  aria-label={`Use ${color}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
