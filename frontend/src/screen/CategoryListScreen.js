import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listCategories, deleteCategory,createCategory } from '../actions/categoryActions';
import {CATEGORY_CREATE_RESET} from '../constants/categoryConstants';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from '../components/Sidebar';

function CategoryListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const categoryList = useSelector(state => state.categoryList);
    const { loading, error, categories } = categoryList;

   

    const categoryDelete = useSelector(state => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete  } = categoryDelete

    // const categoryCreate = useSelector(state => state.categoryCreate);
    // const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory  } = categoryCreate

    const userInfo = useSelector(state => state.adminLogin.userInfo)


    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }


    useEffect(() => {

      if (!userInfo || !userInfo.isAdmin) {
        navigate('/admin/login')
      }else{
        dispatch(listCategories())
      }
    }, [dispatch, navigate, successDelete, userInfo]);
    


    const deleteHandler = (id) => {
    if(window.confirm('Confirm deletion of category?'))
        {
            dispatch(deleteCategory(id))
        }   
    };


    const createCategoryHandler = () =>{
            // dispatch(createCategory())
            navigate(`/admin/category/create`);
    }

  return (

    <div className='grid-container'>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    
  
    <div className="category-list-container" style={{ marginLeft:'19%', marginTop:'2%' }}>
      <Row className='aligh-items-center'>
        <Col>
            <Button className='my' onClick={createCategoryHandler}>
                <i className='fas fa-plus' style={{'text-Decoration': 'underline'}}> </i>
            </Button>
        </Col>

        <Col className='text-right'>
            <h1> Categories</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

     



      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="table-container">
        <Table striped border hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ACTIONS</th>
              
            </tr>
          </thead>
 
          <tbody>
            {categories.map(category => (
              
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
           

                <td>
                  <LinkContainer to={`/admin/category/${category._id}/edit`}>
                    <Button variant='light' className='btn'>
                      <i className='fas fa-edit' style={{color:'black'}}></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='my'
                    onClick={() => deleteHandler(category._id)}
                  >
                    <i className='fas fa-trash' ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}
    </div>
    </div>
  );
}
 

export default CategoryListScreen;




