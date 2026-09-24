import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import { listTableDetails, updateTable } from '../actions/categoryActions';
import { TABLE_UPDATE_RESET } from '../constants/categoryConstants';

function TableEditScreen() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableDetails = useSelector((state) => state.tableDetails);
  const { error: errorDetails, loading: loadingDetails, table: tableObj } = tableDetails;

  const tableUpdate = useSelector((state) => state.tableUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = tableUpdate;

  const userInfo = useSelector((state) => state.adminLogin.userInfo);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TABLE_UPDATE_RESET });
      navigate('/admin/tablelist');
    } else if (!tableObj || tableObj._id !== Number(id)) {
      dispatch(listTableDetails(id));
    } else {
      setName(tableObj.name);
    }
  }, [dispatch, tableObj, id, successUpdate, navigate]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/admin/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTable({ _id: id, name }));
  };

  return (
    <AdminLayout title="Edit Table" backTo="/admin/tablelist">
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
                <label className="label" htmlFor="name">Table name</label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="Table name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Update</button>
                <button type="button" className="btn-ghost" onClick={() => navigate('/admin/tablelist')}>
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

export default TableEditScreen;
