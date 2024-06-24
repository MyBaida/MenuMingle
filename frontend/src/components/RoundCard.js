import React from 'react';
import {useNavigate} from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'

const RoundCard = ({ menuItem }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 const qty = 1

  const cartHandler = () => {
    dispatch(addToCart(menuItem._id, qty,true))
    // navigate(`/cart/${menuItem._id}?qty=${qty}`);
  }

  return (
    
      <div className="single-menu">
          <img src={menuItem.image} alt={menuItem.name} />
            <div className="menu-content">
                    <h5>{menuItem.name}<span>₵{menuItem.price}</span></h5>
                    <p dangerouslySetInnerHTML={{ __html: menuItem.description }}></p>
                    <p className='card-time'><span className='fas fa-clock'></span>{menuItem.cooking_duration} mins</p>
                
                
                <button className='cart-btn' onClick={()=> {cartHandler()}}>Add To Cart</button>
            </div>
        </div>
    // </div>
    

  );
};

export default RoundCard;