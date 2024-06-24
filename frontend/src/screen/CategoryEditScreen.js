
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listCategoryDetails, updateCategory } from '../actions/categoryActions';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

function CategoryEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryDetails = useSelector(state => state.categoryDetails);
    const { error: errorDetails, loading: loadingDetails, category: categoryObj } = categoryDetails;

    const categoryUpdate = useSelector(state => state.categoryUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate;

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            navigate('/admin/categorylist');
        } else {
            if (!categoryObj || categoryObj._id !== Number(id)) {
                dispatch(listCategoryDetails(id));
            } else {
                setName(categoryObj.name);
            }
        }
    }, [dispatch, categoryObj, id, successUpdate, navigate]);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login')
        }
       
      }, [userInfo, navigate]
      );

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({
            _id: id,
            name,
        }));
    };

    return (
        <div>
            
            <h3 className='logo'><Link to='/admin/categorylist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>

            <FormContainer>
                <h1>Edit Category</h1>
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

export default CategoryEditScreen;
