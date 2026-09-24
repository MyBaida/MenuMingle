import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { listMenuItems, deleteMenuItem } from '../actions/menuItemActions';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';
import { mediaUrl } from '../config';

function MenuItemListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItemList = useSelector((state) => state.menuItemList);
  const { loading, error, menuItems } = menuItemList;

  const menuItemDelete = useSelector((state) => state.menuItemDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = menuItemDelete;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    } else {
      dispatch(listMenuItems());
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Confirm deletion of this menu item?')) {
      dispatch(deleteMenuItem(id));
    }
  };

  return (
    <AdminLayout
      title="Menu Items"
      action={
        <button className="btn-primary" onClick={() => navigate('/admin/menuItem/create')}>
          <BsPlus className="h-4 w-4" /> New Item
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
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !menuItems || menuItems.length === 0 ? (
        <div className="panel py-16 text-center text-sm text-slate-400">
          No menu items yet. Create your first one.
        </div>
      ) : (
        <div className="table-wrap overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((menuItem) => (
                <tr key={menuItem._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={mediaUrl(menuItem.image)}
                        alt={menuItem.name}
                        className="h-11 w-11 shrink-0 rounded-lg object-cover ring-1 ring-slate-100"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium capitalize text-slate-900">{menuItem.name}</p>
                        <p className="text-xs text-slate-400">#{menuItem._id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-slate-100 text-slate-600">{menuItem.category}</span>
                  </td>
                  <td className="font-semibold text-slate-900">GH₵{Number(menuItem.price).toFixed(2)}</td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="btn-icon h-9 w-9 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-300"
                        onClick={() => navigate(`/admin/menuItem/${menuItem._id}/edit`)}
                        aria-label={`Edit ${menuItem.name}`}
                      >
                        <BsPencil className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon h-9 w-9 text-rose-500 ring-1 ring-inset ring-rose-200 hover:bg-rose-50 focus:ring-rose-300"
                        onClick={() => deleteHandler(menuItem._id)}
                        aria-label={`Delete ${menuItem.name}`}
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

export default MenuItemListScreen;
