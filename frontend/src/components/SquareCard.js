import React from 'react';
import {useNavigate} from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

const SquareCard = ({ menuItem }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 const qty = 1

  const cartHandler = () => {
    dispatch(addToCart(menuItem._id,qty, true))
    // navigate(`/cart/${menuItem._id}?qty=${qty}`);
  }

  return (
    
      <div className="dashboard-card">
          <img className='card-image' src={menuItem.image} alt={menuItem.name} />
            <div className="card-detail">
                    <h4>{menuItem.name}<span>₵{menuItem.price}</span></h4>
                    <p dangerouslySetInnerHTML={{ __html: menuItem.description }}></p>
                    <p className='card-time'><span className='fas fa-clock'></span>{menuItem.cooking_duration} mins</p>
                
                
                <button className='cart-btn' onClick={()=> {cartHandler()}}>Add To Cart</button>
            </div>
        </div>
    // </div>
    

  );
};

export default SquareCard;