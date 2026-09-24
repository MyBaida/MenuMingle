import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { createMenuItem } from '../actions/menuItemActions';
import { listCategories } from '../actions/categoryActions';

function MenuItemCreateScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: categoriesLoading, error: categoriesError, categories } = categoryList;

  const menuItemCreate = useSelector((state) => state.menuItemCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, menuItem: createdMenuItem } = menuItemCreate;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    dispatch(listCategories());
    if (successCreate) {
      navigate('/admin/menuItemlist');
    }
  }, [dispatch, navigate, successCreate, createdMenuItem]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('cooking_duration', duration);
    dispatch(createMenuItem(formData));
  };

  return (
    <AdminLayout title="Create Menu Item" backTo="/admin/menuItemlist">
      <div className="mx-auto w-full max-w-xl">
        <div className="panel">
          {loadingCreate && <Loader />}
          {errorCreate && (
            <div className="mb-4">
              <Message variant="danger">{errorCreate}</Message>
            </div>
          )}

          {categoriesLoading ? (
            <Loader />
          ) : categoriesError ? (
            <Message variant="danger">{categoriesError}</Message>
          ) : (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">Name</label>
                <input id="name" type="text" className="input" placeholder="Dish name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="price">Price (GH₵)</label>
                  <input id="price" type="number" step="0.01" min="0" className="input" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="label" htmlFor="duration">Cooking duration (mins)</label>
                  <input id="duration" type="text" className="input" placeholder="e.g. 15" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="category">Category</label>
                <select id="category" className="input" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label" htmlFor="description">Description</label>
                <textarea id="description" rows={4} className="input resize-y" placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" className="btn-ghost" onClick={() => navigate('/admin/menuItemlist')}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default MenuItemCreateScreen;
