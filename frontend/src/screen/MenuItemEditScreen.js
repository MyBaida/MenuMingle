import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { listMenuItemDetails, updateMenuItem } from '../actions/menuItemActions';
import { listCategories } from '../actions/categoryActions';
import { MENUITEM_UPDATE_RESET } from '../constants/menuItemConstants';
import { mediaUrl } from '../config';

function MenuItemEditScreen() {
  const { id: menuItemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [uploading, setUploading] = useState(false);

  const menuItemDetails = useSelector((state) => state.menuItemDetails);
  const { error: menuItemDetailsError, loading: menuItemDetailsLoading, menuItem } = menuItemDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: categoriesLoading, error: categoriesError, categories } = categoryList;

  const menuItemUpdate = useSelector((state) => state.menuItemUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = menuItemUpdate;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MENUITEM_UPDATE_RESET });
      navigate('/admin/menuItemlist');
    } else if (!menuItem || !menuItem.name || menuItem._id !== Number(menuItemId)) {
      dispatch(listMenuItemDetails(menuItemId));
    } else {
      setName(menuItem.name);
      setPrice(menuItem.price);
      setCategory(menuItem.category);
      setDescription(menuItem.description);
      setDuration(menuItem.cooking_duration);
      setImage(menuItem.image);
    }
  }, [dispatch, menuItem, menuItemId, navigate, successUpdate]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateMenuItem({
      _id: menuItemId,
      name,
      price,
      image,
      category,
      description,
      cooking_duration: duration,
    }));
    navigate('/admin/menuItemlist');
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('menuItem_id', menuItemId);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/menuItems/upload/', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <AdminLayout title="Edit Menu Item" backTo="/admin/menuItemlist">
      <div className="mx-auto w-full max-w-xl">
        <div className="panel">
          {loadingUpdate && <Loader />}
          {errorUpdate && (
            <div className="mb-4">
              <Message variant="danger">{errorUpdate}</Message>
            </div>
          )}

          {menuItemDetailsLoading || categoriesLoading ? (
            <Loader />
          ) : menuItemDetailsError || categoriesError ? (
            <Message variant="danger">{menuItemDetailsError || categoriesError}</Message>
          ) : (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">Name</label>
                <input id="name" type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="price">Price (GH₵)</label>
                  <input id="price" type="number" step="0.01" min="0" className="input" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="label" htmlFor="duration">Cooking duration (mins)</label>
                  <input id="duration" type="text" className="input" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="label">Image</label>
                <div className="flex items-center gap-4">
                  {image && (
                    <img src={mediaUrl(image)} alt="Preview" className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
                  />
                </div>
                {uploading && <Loader />}
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
                <textarea id="description" rows={4} className="input resize-y" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Update</button>
                <button type="button" className="btn-ghost" onClick={() => navigate('/admin/menuItemlist')}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default MenuItemEditScreen;
