import axios from 'axios'
import { CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
 } from '../constants/cartConstants'



//  export const addToCart = (id, qty) => async (dispatch, getState) => {
//     // console.log('Adding to Cart:', id, qty);
//     try {
//       const { data } = await axios.get(`/api/menuItems/${id}`);
//       dispatch({
//         type: CART_ADD_ITEM,
//         payload: {
//           menuItem: data._id,
//           name: data.name,
//           image: data.image,
//           price: data.price,
//           qty,
//         },
//       });
  
//       // Update localStorage after dispatching the action
//       localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };
  

export const addToCart = (id, qty,fromHomeScreen) => async (dispatch, getState) => {
  try {
      const { data } = await axios.get(`/api/menuItems/${id}`);
      dispatch({
          type: CART_ADD_ITEM,
          payload: {
              menuItem: data._id,
              name: data.name,
              image: data.image,
              price: data.price,
              qty,
          },
      });

      // Update localStorage after dispatching the action
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

      if (fromHomeScreen) {
        window.alert('Item Added to cart');
      }
    //   window.alert('Item Added to cart')
  } catch (error) {
      console.error('Error adding to cart:', error);
  }
};


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch ({
        type:CART_REMOVE_ITEM,
        payload:id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
