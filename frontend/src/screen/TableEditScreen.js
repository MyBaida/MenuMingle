



import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {listTableDetails,  updateTable } from '../actions/categoryActions';
import { TABLE_UPDATE_RESET } from '../constants/categoryConstants';

function TableEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tableDetails = useSelector(state => state.tableDetails);
    const { error: errorDetails, loading: loadingDetails, table: tableObj } = tableDetails;

    const tableUpdate = useSelector(state => state.tableUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = tableUpdate;

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: TABLE_UPDATE_RESET });
            navigate('/admin/tablelist');
        } else {
            if (!tableObj || tableObj._id !== Number(id)) {
                dispatch(listTableDetails(id));
            } else {
                setName(tableObj.name);
            }
        }
    }, [dispatch, tableObj, id, successUpdate, navigate]);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login')
        }
       
      }, [userInfo, navigate]
      );

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateTable({
            _id: id,
            name,
        }));
    };

    return (
        <div>
            <h3 className='logo'><Link to='/admin/tablelist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>

            <FormContainer>
                <h1>Edit Table</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loadingDetails ? <Loader /> : errorDetails ? <Message variant='danger'>{errorDetails}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Button className='my' style={{marginTop:'7px'}} type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}

            </FormContainer>
        </div>
    );
}

export default TableEditScreen;
