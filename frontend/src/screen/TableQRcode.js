import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import AdminLayout from '../components/AdminLayout';
import { BsDownload, BsPrinter } from 'react-icons/bs';
import { apiUrl } from '../config';

const TableQrCode = () => {
  const { id } = useParams();
  const [tableExists, setTableExists] = useState(false);
  const [tableName, setTableName] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    fetchTables();
    if (id) {
      const homeURL = window.location.origin;
      setQRCodeValue(`${homeURL}/table/${id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTables = async () => {
    try {
      const response = await fetch(apiUrl('/api/menuItems/tables'));
      if (response.ok) {
        const data = await response.json();
        const table = data.find((t) => t._id === Number(id));
        setTableExists(Boolean(table));
        if (table) setTableName(table.name);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const imageData = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = imageData;
    anchor.download = `qrcode_${id}.png`;
    anchor.click();
  };

  const printQRCode = () => window.print();

  if (!tableExists) {
    return (
      <AdminLayout title="Table QR Code" backTo="/admin/tablelist">
        <div className="panel py-16 text-center text-sm text-slate-400">Table does not exist.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Table QR Code"
      backTo="/admin/tablelist"
      action={
        <div className="flex items-center gap-2 print:hidden">
          <button className="btn-ghost" onClick={downloadQRCode}>
            <BsDownload className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
          </button>
          <button className="btn-primary" onClick={printQRCode}>
            <BsPrinter className="h-4 w-4" /> <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-sm">
        <div className="panel flex flex-col items-center text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">Scan to order</p>
          {tableName && <h2 className="mt-1 text-2xl font-bold capitalize text-slate-900">{tableName}</h2>}
          <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <QRCodeCanvas value={qrCodeValue} size={260} />
          </div>
          <p className="mt-6 text-xs text-slate-400">Served</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TableQrCode;
