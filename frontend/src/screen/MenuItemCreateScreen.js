import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { Form, Button, Row, Col, Image } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { createMenuItem } from '../actions/menuItemActions';
import { listCategories } from '../actions/categoryActions';
import { MENUITEM_CREATE_RESET } from '../constants/menuItemConstants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function MenuItemCreateScreen() { 
    const navigate = useNavigate(); 

    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [duration, setDuration] = useState(''); 
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch(); 

    const categoryList = useSelector(state => state.categoryList); 
    const { loading: categoriesLoading, error: categoriesError, categories } = categoryList; 

    const menuItemCreate = useSelector(state => state.menuItemCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, menuItem: createdMenuItem  } = menuItemCreate;

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {
        dispatch(listCategories());
        if (successCreate) {
            navigate(`/admin/menuItemlist`); 
        } 
    }, [dispatch, navigate, successCreate, createdMenuItem]);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login')
        }
       
      }, [userInfo, navigate]
      );

    const submitHandler = (e) => {    
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        // formData.append('image', image);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('cooking_duration', duration);

        dispatch(createMenuItem(formData));
    };

    // const uploadFileHandler = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    
    //     formData.append('image', file);
    
    //     setUploading(true);
    
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         };
    
    //         const { data } = await axios.post('api/menuItems/create-upload', formData, config);
    
    //         setImage(data);
    //         setUploading(false);
    
    //     } catch (error) {
    //         setUploading(false);
         
    //     }
    // };
    

    return ( 
        <div> 
            
            <h3 className='logo'><Link to='/admin/menuItemlist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>

            <FormContainer> 
                <h1>Create Menu Item</h1> 
                {loadingCreate && <Loader />}  
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>} 

                { categoriesLoading ? ( 
                    <Loader /> 
                ) : categoriesError ? ( 
                    <Message variant='danger'>{ categoriesError}</Message> 
                ) : ( 
                    <Form onSubmit={submitHandler}> 
                        <Form.Group controlId='name'> 
                            <Form.Label>Name</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            /> 
                        </Form.Group> 

                        <Form.Group controlId='price'> 
                            <Form.Label>Price</Form.Label> 
                            <Form.Control 
                                type='number' 
                                placeholder='Enter price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            /> 
                        </Form.Group> 

                        {/* <Form.Group controlId='formFile'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='file'
                                label='Upload image'
                                custom
                                className='image-file'
                                placeholder='Upload Image'
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </Form.Group> */}
                    
                         <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group> 

                        <Form.Group controlId='description'> 
                            <Form.Label>Description</Form.Label> 
                            <Form.Control 
                                as='textarea' 
                                rows={3}
                                placeholder='Enter Description' 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            /> 
                        </Form.Group>

                        {/* <Form.Group controlId='description'> 
                            <Form.Label>Description</Form.Label> 
                            <CKEditor
                                editor={ ClassicEditor }
                                data={ description }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />
                        </Form.Group> */}

                        <Form.Group controlId='duration'> 
                            <Form.Label>Duration</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Duration' 
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)} 
                            /> 
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my' style={{marginTop:'7px'}}>Create</Button> 
                    </Form> 
                 )}  
            </FormContainer> 
        </div> 
    ); 
} 

export default MenuItemCreateScreen;
