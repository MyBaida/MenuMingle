import axios from 'axios'
import { removeFromCart } from '../actions/cartActions'
import { ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,


    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    

} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/orders/add/`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
      
      const tableName = localStorage.getItem('tableName');
      window.alert(`Order for Table ${tableName} Has Been Placed`);

      const cart = JSON.parse(localStorage.getItem('cartItems'));
   
    cart.forEach(item => {
      dispatch(removeFromCart(item.menuItem));
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}/`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })

    // navigate(`/order/${data._id}`)
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
