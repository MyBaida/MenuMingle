import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
// import  Message  from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { createOrder } from '../actions/orderActions'
import Footer from '../components/Footer';

const Cart = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [tableId, setTableId] = useState('');
    const [tableExists, setTableExists] = useState(false);


    const newCart = { ...cart };
    newCart.itemPrice = newCart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    newCart.totalPrice = Number(newCart.itemPrice);



  useEffect(() => {
    fetchTables();
    
    const tableId = localStorage.getItem('tableId');
    if (tableId) {
        setTableId(tableId);
    }
}, []);
  



const fetchTables = async () => {
  try {
    const response = await fetch('/api/menuItems/tables');
    if (response.ok) {
      const data = await response.json();
      

      const tableId = localStorage.getItem('tableId');
      const tableExist = data.some(table => table._id === Number(tableId));
      setTableExists(tableExist);

      if (tableExists) {
        const table = data.find(table => table._id === Number(tableId));
        const tableName = table.name;
        localStorage.setItem('tableName', tableName);
      }
    } else {
      throw new Error('Failed to fetch tables');
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
  }
};


    

        const orderHandler = () => {
          const tableId = localStorage.getItem('tableId');
          if(newCart.totalPrice!== 0){
            dispatch(createOrder({
              orderItems: cart.cartItems,
              itemPrice: newCart.itemPrice,
              totalPrice: newCart.totalPrice,
              table: tableId,

              
          }, navigate));
          }else{
            window.alert('Cannot Order 0 Items')
          }
          
      };

        const returnHandler = () => {
          navigate(`/table/${tableId}`)
        }
  

    return (
      <div>
        {cartItems.length !== 0 ?
        <Header/> : <h5 onClick={returnHandler} className='empty-cart-logo'>MenuMingle</h5>}
        <div className='cart-content'>
          <Col>
            <Row >
              {cartItems.length === 0 ? (<div className='cart-empty'>
              <h2 >Your cart is currently empty </h2><button className='cart-btn' onClick={returnHandler}> Return To Menu</button></div>
              ) : (<>
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.menuItem}>
                      <Row>
                        <div className='cart-product'>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <div className='cart-product-details'>
                        <Col md={2} style={{marginLeft:'10px'}}>
                          <h6 style={{color:'tomato'}}>{item.name}</h6>
                        </Col>
                       
                       <Col md={2} >GHS {item.price}</Col>

                     
                        
                       
                       
    <Col md={1}>

<i className='fas fa-times' ></i>
</Col>
<Col md={2}>
<input

className='qty'
    type="number"
    value={item.qty}
    onChange={(e) => dispatch(addToCart(item.menuItem, Number(e.target.value)))}
    min="1" // Ensure the minimum value is 1
/>


</Col>


                        
                        <Col md={1}>


                          <Button 
                            style={{backgroundColor:'white', border:'none'}}
                            className='card-trash'
                            type='button'
                            variant='light'
                            onClick={() => dispatch(removeFromCart(item.menuItem))}
                            >
                                <i className='fas fa-trash' style={{color:'black'}} ></i>
                          </Button>
                        </Col>
                        </div>
                        </div>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='cart-order'>
         <hr className='divider'></hr> 
        <div className='order-total'>
            <h2>Order Summary</h2>
            <p>Item(s)<span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span></p>
            <p>Subtotal<span>₵{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span></p>
            
            <hr className='divider'></hr>
        <p>Total <span>₵{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span></p>
        </div>
        <button
        className='cart-btn'
        disabled={cartItems.length === 0}
        onClick={orderHandler}>
            Place Order
        </button>
        </div>
    </>
              )}
          </Row>
        
        
        </Col>
      </div>
      {/* <Footer/> */}
      </div>
    )
}

export default Cart
