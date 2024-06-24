
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { createTable } from '../actions/categoryActions';
import {TABLE_CREATE_RESET} from '../constants/categoryConstants';

function TableCreateScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [tables, setTables] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    const tableCreate = useSelector(state => state.tableCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, table: createdTable  } = tableCreate

   
    useEffect(() => {
        dispatch({type: TABLE_CREATE_RESET });
    
      
    
        if (successCreate) {
            navigate(`/admin/tablelist`); 
        } 
        
    }, [dispatch, navigate, successCreate, createdTable]);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login')
        }
       
      }, [userInfo, navigate]
      );

    const submitHandler = (e) => {
        e.preventDefault();
       

        dispatch(createTable({
            name,
        }))
    };

    return (
        <div>
            
            <h3 className='logo'><Link to='/admin/tablelist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>

            <FormContainer>
                <h1>Create Table</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

                {/* {loadingDetails ? <Loader /> : errorDetails ? <Message variant='danger'>{errorDetails}</Message>
                    : ( */}
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

                            <Button className='my' style={{marginTop:'7px'}} type='submit' variant='primary'>Create</Button>

                        </Form>
                    {/* )} */}

            </FormContainer>
        </div>
    );
}

export default TableCreateScreen;
