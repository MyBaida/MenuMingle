import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { createCategory } from '../actions/categoryActions';
import {CATEGORY_CREATE_RESET} from '../constants/categoryConstants';

function CategoryCreateScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryCreate = useSelector(state => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory  } = categoryCreate

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login')
        }
       
      }, [userInfo, navigate]
      );

    useEffect(() => {   
        dispatch({type: CATEGORY_CREATE_RESET });
    
      
    
        if (successCreate) {
            navigate(`/admin/categorylist`); // Use createdCategory here
        } 
        
    }, [dispatch, navigate, successCreate, createdCategory]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createCategory({
            name,
        }))
    };

    return (
        <div>
            
            <h3 className='logo'><Link to='/admin/categorylist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>

            <FormContainer>
                <h1>Create Category</h1>
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

export default CategoryCreateScreen;
