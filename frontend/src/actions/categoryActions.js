import axios from 'axios'
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    CATEGORY_MENUITEMS_REQUEST,
    CATEGORY_MENUITEMS_SUCCESS,
    CATEGORY_MENUITEMS_FAIL,

    
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,

    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DELETE_FAIL,

    TABLE_CREATE_REQUEST,
    TABLE_CREATE_SUCCESS,
    TABLE_CREATE_FAIL,

    TABLE_UPDATE_REQUEST,
    TABLE_UPDATE_SUCCESS,
    TABLE_UPDATE_FAIL,

    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,

} from '../constants/categoryConstants'


export const listCategories = () => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })
  
      const { data } = await axios.get(`/api/categories/`)
  
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data
      });
  
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }


  export const listCategoryMenuItems = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_MENUITEMS_REQUEST })

        const { data } = await axios.get(`/api/categories/${id}/menuItems/`)

        dispatch({
            type: CATEGORY_MENUITEMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_MENUITEMS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listCategoryDetails = (id) => async (dispatch) => {
  try{
      dispatch({type: CATEGORY_DETAILS_REQUEST})
      const { data } = await axios.get(`/api/categories/${id}`);

      dispatch({
          type: CATEGORY_DETAILS_SUCCESS,
          payload: data
      })

  }

  catch(error){
      dispatch({
         type: CATEGORY_DETAILS_FAIL,
         payload:error.response  && error.response.data.message 
         ? error.response.data.message 
         : error.message
      })
  }
}






export const deleteCategory = (id) => async (dispatch) => {
  try {
      dispatch({
          type: CATEGORY_DELETE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.delete(
          `/api/categories/delete/${id}/`,
          config
      )

      dispatch({
          type: CATEGORY_DELETE_SUCCESS,
      })


  } catch (error) {
      dispatch({
          type: CATEGORY_DELETE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}




export const createCategory = (name) => async (dispatch) => {
  try {
      dispatch({
          type: CATEGORY_CREATE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.post(
          `/api/categories/create/`,
          name,
          config
      )
      dispatch({
          type: CATEGORY_CREATE_SUCCESS,
          payload: data,
      })


  } catch (error) {
      dispatch({
          type: CATEGORY_CREATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}



export const updateCategory = (category) => async (dispatch) => {
  try {
      dispatch({
          type: CATEGORY_UPDATE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.put(
          `/api/categories/update/${category._id}/`,
          category,
          config
      )
      dispatch({
          type: CATEGORY_UPDATE_SUCCESS,
          payload: data,
      })


      dispatch({
          type: CATEGORY_DETAILS_SUCCESS,
          payload: data
      })


  } catch (error) {
      dispatch({
          type: CATEGORY_UPDATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}


export const deleteTable = (id) => async (dispatch) => {
  try {
      dispatch({
          type: TABLE_DELETE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.delete(
          `/api/menuItems/table/delete/${id}/`,
          config
      )

      dispatch({
          type: TABLE_DELETE_SUCCESS,
      })


  } catch (error) {
      dispatch({
          type: TABLE_DELETE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}




export const createTable = (name) => async (dispatch) => {
  try {
      dispatch({
          type: TABLE_CREATE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.post(
          `/api/menuItems/table/create/`,
          name,
          config
      )
      dispatch({
          type: TABLE_CREATE_SUCCESS,
          payload: data,
      })


  } catch (error) {
      dispatch({
          type: TABLE_CREATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}



export const updateTable = (table) => async (dispatch) => {
  try {
      dispatch({
          type: TABLE_UPDATE_REQUEST
      })

      

      const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
      }

      const { data } = await axios.put(
          `/api/menuItems/table/update/${table._id}/`,
          table,
          config
      )
      dispatch({
          type: TABLE_UPDATE_SUCCESS,
          payload: data,
      })


      dispatch({
          type: TABLE_DETAILS_SUCCESS,
          payload: data
      })


  } catch (error) {
      dispatch({
          type: TABLE_UPDATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}

export const listTableDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: TABLE_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/menuItems/table/${id}`);
  
        dispatch({
            type: TABLE_DETAILS_SUCCESS,
            payload: data
        })
  
    }
  
    catch(error){
        dispatch({
           type: TABLE_DETAILS_FAIL,
           payload:error.response  && error.response.data.message 
           ? error.response.data.message 
           : error.message
        })
    }
  }