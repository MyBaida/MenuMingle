import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from 'qrcode.react';
import AdminLayout from '../components/AdminLayout';
import { BsPrinter } from 'react-icons/bs';
import { apiUrl } from '../config';

const QrCode = () => {
  const [tables, setTables] = useState([]);
  const userInfo = useSelector((state) => state.adminLogin.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchTables();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, navigate]);

  const fetchTables = async () => {
    try {
      const response = await fetch(apiUrl('/api/menuItems/tables'));
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const homeURL = window.location.origin;

  return (
    <AdminLayout
      title="QR Codes"
      action={
        tables.length > 0 ? (
          <button className="btn-primary print:hidden" onClick={() => window.print()}>
            <BsPrinter className="h-4 w-4" /> Print All
          </button>
        ) : null
      }
    >
      {tables.length === 0 ? (
        <div className="panel py-16 text-center text-sm text-slate-400">No tables to generate codes for.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <div key={table._id} className="panel flex flex-col items-center text-center">
              <h3 className="text-base font-semibold capitalize text-slate-900">{table.name}</h3>
              <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                <QRCodeCanvas value={`${homeURL}/table/${table._id}`} size={180} />
              </div>
              <p className="mt-4 text-xs text-slate-400">Scan to order</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default QrCode;
