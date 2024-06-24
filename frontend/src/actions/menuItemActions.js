import axios from 'axios'
import {
    MENUITEM_LIST_REQUEST,
    MENUITEM_LIST_SUCCESS,
    MENUITEM_LIST_FAIL,

    
    MENUITEM_DETAILS_REQUEST,
    MENUITEM_DETAILS_SUCCESS,
    MENUITEM_DETAILS_FAIL,

    MENUITEM_DELETE_REQUEST,
    MENUITEM_DELETE_SUCCESS,
    MENUITEM_DELETE_FAIL,

    
    MENUITEM_CREATE_REQUEST,
    MENUITEM_CREATE_SUCCESS,
    MENUITEM_CREATE_FAIL,
    MENUITEM_CREATE_RESET,


    MENUITEM_UPDATE_REQUEST,
    MENUITEM_UPDATE_SUCCESS,
    MENUITEM_UPDATE_FAIL,


    MENUITEM_PROMO_REQUEST,
    MENUITEM_PROMO_SUCCESS,
    MENUITEM_PROMO_FAIL,
} from  '../constants/menuItemConstants'


export const listMenuItems = () => async (dispatch) => {
    try{
        dispatch({type: MENUITEM_LIST_REQUEST})
        const { data } = await axios.get(`/api/menuItems/`);

        dispatch({
            type: MENUITEM_LIST_SUCCESS,
            payload: data
        })

    }

    catch(error){
        dispatch({
           type: MENUITEM_LIST_FAIL,
           payload:error.response  && error.response.data.detail 
           ? error.response.data.detail 
           : error.message
        })
    }
} 

export const listMenuItemDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: MENUITEM_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/menuItems/${id}`);

        dispatch({
            type: MENUITEM_DETAILS_SUCCESS,
            payload: data
        })

    }

    catch(error){
        dispatch({
           type: MENUITEM_DETAILS_FAIL,
           payload:error.response  && error.response.data.message 
           ? error.response.data.message 
           : error.message
        })
    }
}




export const deleteMenuItem = (id) => async (dispatch) => {
    try{
        dispatch({
            type: MENUITEM_DELETE_REQUEST,
        })

        

        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        const {data} = await axios.delete(
            `/api/menuItems/delete/${id}/`,
            config
        )

        dispatch({
            type: MENUITEM_DELETE_SUCCESS,
            
        })

    } catch(error){
        dispatch({
           type: MENUITEM_DELETE_FAIL,
           payload:error.response  && error.response.data.detail 
                ? error.response.data.detail 
                : error.message,
        })
    }
}




export const createMenuItem = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: MENUITEM_CREATE_REQUEST
        })

        

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                
            }
        }

        const { data } = await axios.post(
            `/api/menuItems/create/`,
            formData,
            config
        )
        dispatch({
            type: MENUITEM_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: MENUITEM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateMenuItem = (menuItem) => async (dispatch) => {
    try {
        dispatch({
            type: MENUITEM_UPDATE_REQUEST
        })

      

        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        const { data } = await axios.put(
            `/api/menuItems/update/${menuItem._id}/`,
            menuItem,
            config
        )
        dispatch({
            type: MENUITEM_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: MENUITEM_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MENUITEM_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}