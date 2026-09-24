import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { deleteTable } from '../actions/categoryActions';
import { BsPlus, BsPencil, BsTrash, BsQrCode } from 'react-icons/bs';
import { apiUrl } from '../config';

function TableListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableDelete = useSelector((state) => state.tableDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = tableDelete;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl('/api/menuItems/tables'));
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchTables();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Confirm deletion of this table?')) {
      dispatch(deleteTable(id));
    }
  };

  return (
    <AdminLayout
      title="Tables"
      action={
        <button className="btn-primary" onClick={() => navigate('/admin/table/create')}>
          <BsPlus className="h-4 w-4" /> New Table
        </button>
      }
    >
      {loadingDelete && <Loader />}
      {errorDelete && (
        <div className="mb-4">
          <Message variant="danger">{errorDelete}</Message>
        </div>
      )}

      {loading ? (
        <Loader full />
      ) : tables.length === 0 ? (
        <div className="panel py-16 text-center text-sm text-slate-400">No tables yet.</div>
      ) : (
        <div className="table-wrap overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Table</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table._id}>
                  <td>
                    <p className="font-medium capitalize text-slate-900">{table.name}</p>
                    <p className="text-xs text-slate-400">#{table._id}</p>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="btn-icon h-9 w-9 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-brand-600 focus:ring-slate-300"
                        onClick={() => navigate(`/admin/table/${table._id}/qrcode`)}
                        aria-label={`QR code for ${table.name}`}
                      >
                        <BsQrCode className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon h-9 w-9 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-300"
                        onClick={() => navigate(`/admin/table/${table._id}/edit`)}
                        aria-label={`Edit ${table.name}`}
                      >
                        <BsPencil className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon h-9 w-9 text-rose-500 ring-1 ring-inset ring-rose-200 hover:bg-rose-50 focus:ring-rose-300"
                        onClick={() => deleteHandler(table._id)}
                        aria-label={`Delete ${table.name}`}
                      >
                        <BsTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default TableListScreen;
