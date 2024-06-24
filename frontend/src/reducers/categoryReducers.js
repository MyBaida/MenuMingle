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
    CATEGORY_CREATE_RESET,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,

    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DELETE_FAIL,

    TABLE_CREATE_REQUEST,
    TABLE_CREATE_SUCCESS,
    TABLE_CREATE_FAIL,
    TABLE_CREATE_RESET,

    TABLE_UPDATE_REQUEST,
    TABLE_UPDATE_SUCCESS,
    TABLE_UPDATE_FAIL,
    TABLE_UPDATE_RESET,

    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,


} from '../constants/categoryConstants'


export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] }

        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
            }

        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const categoryMenuItemsReducer = (state = { catproducts: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case CATEGORY_MENUITEMS_REQUEST:
            return { ...state, loading: true, error: null }

        case CATEGORY_MENUITEMS_SUCCESS:
            return { ...state, loading: false, catproducts: action.payload }

        case CATEGORY_MENUITEMS_FAIL:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}

export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { loading: true, ...state }

        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload }

        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}




export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true }

        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true }

        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const categoryCreateReducer = (state = { name: {} }, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true }

        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, name: action.payload }

        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case CATEGORY_CREATE_RESET:
            return { name: {} }

        default:
            return state
    }
}


export const categoryUpdateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true }

        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, category: action.payload }

        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case CATEGORY_UPDATE_RESET:
            return { category: {} }

        default:
            return state
    }
}

export const tableDetailsReducer = (state = { table: {} }, action) => {
    switch (action.type) {
        case TABLE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case TABLE_DETAILS_SUCCESS:
            return { loading: false, table: action.payload }

        case TABLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}




export const tableDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_DELETE_REQUEST:
            return { loading: true }

        case TABLE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case TABLE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const tableCreateReducer = (state = { name: {} }, action) => {
    switch (action.type) {
        case TABLE_CREATE_REQUEST:
            return { loading: true }

        case TABLE_CREATE_SUCCESS:
            return { loading: false, success: true, name: action.payload }

        case TABLE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case TABLE_CREATE_RESET:
            return { name: {} }

        default:
            return state
    }
}


export const tableUpdateReducer = (state = { table: {} }, action) => {
    switch (action.type) {
        case TABLE_UPDATE_REQUEST:
            return { loading: true }

        case TABLE_UPDATE_SUCCESS:
            return { loading: false, success: true, table: action.payload }

        case TABLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case TABLE_UPDATE_RESET:
            return { table: {} }

        default:
            return state
    }
}