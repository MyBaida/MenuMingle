import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, ListGroup, Row, Col, Image } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Sidebar from '../components/Sidebar';

function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
    
    const userInfo = useSelector(state => state.adminLogin.userInfo)

    const [orders, setOrders] = useState([]);



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchOrders()
        } else {
            navigate('/admin/login')
        }

    }, [dispatch, navigate, userInfo])



    const fetchOrders = async () => {
        try {
          const response = await fetch('/api/orders');
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            throw new Error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

    


    return (
        <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div style={{ marginLeft:'19%', marginTop:'2%' }}>
            <h1>Orders</h1>
            {/* {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : ( */}
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TABLE</th>
                                    <th>ORDER</th>
                                    <th>DATE</th>
                                    <th>TIME</th>
                                    <th>TOTAL</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.table}</td>
                                        
                            <td style={{width:'259px'}}>

                            {order.orderItems.length === 0 ? 
                            <h5>Order is empty</h5>
                            :(
                                <ListGroup variant='flush' >
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index} style={{width:'259px'}}>
                                                <Col>

                                                    <Row>
                                                    <Image src={item.image} alt={item.name} fluid rounded style={{width:'90px', height:'60px'}}/>
                                                    {item.name}
                                                    </Row>

                                                    <Row>
                                                    {item.qty} X GHS {item.price} = GHS {(item.qty*item.price).toFixed(2)}
                                                    </Row>
                                                </Col>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                            

                        </td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.createdAt.substring(11, 19)}</td>
                                        <td>GHc{order.totalPrice}</td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    {/* )} */}
        </div>
        </div>
    )
}

export default OrderListScreen