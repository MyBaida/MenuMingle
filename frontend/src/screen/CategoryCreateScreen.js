import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { createCategory } from '../actions/categoryActions';
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants';

function CategoryCreateScreen() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory } = categoryCreate;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });
    if (successCreate) {
      navigate('/admin/categorylist');
    }
  }, [dispatch, navigate, successCreate, createdCategory]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name }));
  };

  return (
    <AdminLayout title="Create Category" backTo="/admin/categorylist">
      <div className="mx-auto w-full max-w-xl">
        <div className="panel">
          {loadingCreate && <Loader />}
          {errorCreate && (
            <div className="mb-4">
              <Message variant="danger">{errorCreate}</Message>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="e.g. Starters"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Create</button>
              <button type="button" className="btn-ghost" onClick={() => navigate('/admin/categorylist')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CategoryCreateScreen;
