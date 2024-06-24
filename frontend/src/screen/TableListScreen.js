import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteTable } from '../actions/categoryActions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from '../components/Sidebar';
import {Link} from 'react-router-dom';

function TableListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

   
    const tableDelete = useSelector(state => state.tableDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete  } = tableDelete


    const userInfo = useSelector(state => state.adminLogin.userInfo)

    const [tables, setTables] = useState([]);


  

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/menuItems/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }


    useEffect(() => {

      if (!userInfo || !userInfo.isAdmin) {
        navigate('/admin/login')
      }else{
        fetchTables()
      }
    }, [dispatch, navigate, successDelete, userInfo]);
    


    const deleteHandler = (id) => {
    if(window.confirm('Confirm deletion of category?'))
        {
            dispatch(deleteTable(id))

    console.log('Table deleted')
        }   
    };


    const createTableHandler = () =>{
            navigate(`/admin/table/create`);
    }


  return (

    <div className='grid-container'>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    
  
    <div className="category-list-container" style={{ marginLeft:'19%', marginTop:'2%' }}>
      <Row className='aligh-items-center'>
        <Col>
            <Button className='my' onClick={createTableHandler}>
                <i className='fas fa-plus' style={{'text-Decoration': 'underline'}}> </i>
            </Button>
        </Col>

        <Col className='text-right'>
            <h1> Tables</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {/* {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}



      
        <div className="table-container">
        <Table striped border hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ACTIONS</th>
              <th></th>
            </tr>
          </thead>
 
          <tbody>
            {tables.map(table => (
              
              <tr key={table._id}>
                <td>{table._id}</td>
                <td>{table.name}</td>
           

                <td>
                  <LinkContainer to={`/admin/table/${table._id}/edit`}>
                    <Button variant='light' className='btn'>
                      <i className='fas fa-edit' style={{color:'black'}}></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(table._id)}
                    className='my'
                  >
                    <i className='fas fa-trash' ></i>
                  </Button>
                </td>
                <td>
                <Link to={`/admin/table/${table._id}/qrcode`} className="link" style={{backgroundColor:'rgb(248, 140, 16)', borderRadius:'5px', color:'white', border:'1px solid', margin:'15px', padding:'10px', transition: 'background-color 0.3s ease' }} 
                onMouseOver={(e) => e.target.style.backgroundColor = 'orange'} // Change background color on mouse over
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgb(248, 140, 16)'} >
                  QR Code
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      
    </div>
    </div>
  );
}
 

export default TableListScreen;




