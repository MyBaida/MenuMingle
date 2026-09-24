import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { createTable } from '../actions/categoryActions';
import { TABLE_CREATE_RESET } from '../constants/categoryConstants';

function TableCreateScreen() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  const tableCreate = useSelector((state) => state.tableCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, table: createdTable } = tableCreate;

  useEffect(() => {
    dispatch({ type: TABLE_CREATE_RESET });
    if (successCreate) {
      navigate('/admin/tablelist');
    }
  }, [dispatch, navigate, successCreate, createdTable]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTable({ name }));
  };

  return (
    <AdminLayout title="Create Table" backTo="/admin/tablelist">
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
              <label className="label" htmlFor="name">Table name</label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="e.g. Table 1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Create</button>
              <button type="button" className="btn-ghost" onClick={() => navigate('/admin/tablelist')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TableCreateScreen;
