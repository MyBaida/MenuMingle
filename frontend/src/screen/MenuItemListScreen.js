import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Table, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listMenuItems, deleteMenuItem } from '../actions/menuItemActions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from '../components/Sidebar';
import QRCode from 'qrcode.react'; // Import QRCode component

function MenuItemListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItemList = useSelector(state => state.menuItemList);
  const { loading, error, menuItems, pages, page } = menuItemList;

  const menuItemDelete = useSelector(state => state.menuItemDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = menuItemDelete;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const userInfo = useSelector(state => state.adminLogin.userInfo)

  const [qrCodeValue, setQRCodeValue] = useState('');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) { 
      navigate('/admin/login')
    }else{
      dispatch(listMenuItems())
    }
   
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
if(window.confirm('Confirm deletion of menuItem?'))
    {
        dispatch(deleteMenuItem(id))
    }   
  }

  const createMenuItemHandler = () => {
    navigate(`/admin/menuItem/create`);

  };
  

 

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div  style={{ marginLeft:'19%', marginTop:'2%' }}>
        <Row className="aligh-items-center">
          <Col>
            <Button className="my" onClick={createMenuItemHandler}>
              <i className="fas fa-plus"></i>
            </Button>
          </Col>

          <Col className="text-right">
            <h1> Menu Items</h1>
          </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="table-container" >
            <Table striped border hover responsive className="table-sm" >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th></th>
                  <th>ACTIONS</th>
                  
                </tr>
              </thead>

              <tbody>
                {menuItems.map(menuItem => (
                  <tr key={menuItem._id}>
                    <td>{menuItem._id}</td>
                    <td>{menuItem.name}</td>
                    <td>GHC {menuItem.price}</td>
                    <td>{menuItem.category}</td>
                    <td>
                      <Image className="admin" src={menuItem.image} alt={menuItem.name} fluid />
                    </td>

                    <td>
                      <LinkContainer to={`/admin/menuItem/${menuItem._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit" style={{color:'black'}}></i>
                        </Button>
                      </LinkContainer>

                      <Button variant="danger" className="my" onClick={() => deleteHandler(menuItem._id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* Display generated QR code
                {qrCodeValue && (
                  <div className="qr-code-container">
                    <QRCode value={qrCodeValue} />
                    <Button className="my-3" onClick={printQRCode}>
                      Print QR Code
                    </Button>
                  </div>
                )} */}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}


export default MenuItemListScreen;
