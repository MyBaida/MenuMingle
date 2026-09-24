import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { listCategoryDetails, updateCategory } from '../actions/categoryActions';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

function CategoryEditScreen() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { error: errorDetails, loading: loadingDetails, category: categoryObj } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      navigate('/admin/categorylist');
    } else if (!categoryObj || categoryObj._id !== Number(id)) {
      dispatch(listCategoryDetails(id));
    } else {
      setName(categoryObj.name);
    }
  }, [dispatch, categoryObj, id, successUpdate, navigate]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ _id: id, name }));
  };

  return (
    <AdminLayout title="Edit Category" backTo="/admin/categorylist">
      <div className="mx-auto w-full max-w-xl">
        <div className="panel">
          {loadingUpdate && <Loader />}
          {errorUpdate && (
            <div className="mb-4">
              <Message variant="danger">{errorUpdate}</Message>
            </div>
          )}

          {loadingDetails ? (
            <Loader />
          ) : errorDetails ? (
            <Message variant="danger">{errorDetails}</Message>
          ) : (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Update</button>
                <button type="button" className="btn-ghost" onClick={() => navigate('/admin/categorylist')}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default CategoryEditScreen;
