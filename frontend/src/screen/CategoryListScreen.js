import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { listCategories, deleteCategory } from '../actions/categoryActions';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';

function CategoryListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    } else {
      dispatch(listCategories());
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Confirm deletion of this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <AdminLayout
      title="Categories"
      action={
        <button className="btn-primary" onClick={() => navigate('/admin/category/create')}>
          <BsPlus className="h-4 w-4" /> New Category
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
      ) : !categories || categories.length === 0 ? (
        <div className="panel py-16 text-center text-sm text-slate-400">No categories yet.</div>
      ) : (
        <div className="table-wrap overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-sm font-semibold text-brand-600">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="font-medium capitalize text-slate-900">{category.name}</p>
                        <p className="text-xs text-slate-400">#{category._id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="btn-icon h-9 w-9 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-300"
                        onClick={() => navigate(`/admin/category/${category._id}/edit`)}
                        aria-label={`Edit ${category.name}`}
                      >
                        <BsPencil className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon h-9 w-9 text-rose-500 ring-1 ring-inset ring-rose-200 hover:bg-rose-50 focus:ring-rose-300"
                        onClick={() => deleteHandler(category._id)}
                        aria-label={`Delete ${category.name}`}
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

export default CategoryListScreen;
