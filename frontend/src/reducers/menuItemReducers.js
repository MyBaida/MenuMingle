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
    MENUITEM_UPDATE_RESET,


    MENUITEM_PROMO_REQUEST,
    MENUITEM_PROMO_SUCCESS,
    MENUITEM_PROMO_FAIL,
} from  '../constants/menuItemConstants'



export const menuItemListReducer = (state = { menuItems: [] }, action) => {
    switch (action.type) {
        case MENUITEM_LIST_REQUEST:
            return { loading: true, menuItems: [] }

        case MENUITEM_LIST_SUCCESS:
            return {
                loading: false,
                menuItems: action.payload,
                // page: action.payload.page,
                // pages: action.payload.pages
            }

        case MENUITEM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const menuItemDetailsReducer = (state = { menuItem: {} }, action) => {
    switch (action.type) {
        case MENUITEM_DETAILS_REQUEST:
            return { loading: true, ...state }

        case MENUITEM_DETAILS_SUCCESS:
            return { loading: false, menuItem: action.payload }

        case MENUITEM_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const menuItemDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case MENUITEM_DELETE_REQUEST:
            return { loading: true }

        case MENUITEM_DELETE_SUCCESS:
            return { loading: false, success: true}

        case MENUITEM_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const menuItemCreateReducer = (state = { menuItem: {} }, action) => {
    switch (action.type) {
        case MENUITEM_CREATE_REQUEST:
            return { loading: true }

        case MENUITEM_CREATE_SUCCESS:
            return { loading: false, success: true, menuItem: action.payload}

        case MENUITEM_CREATE_FAIL:
            return { loading: false, error: action.payload }

            case MENUITEM_CREATE_RESET:
                return { menuItem: {} }

        default:
            return state
    }
}

export const menuItemUpdateReducer = (state = { menuItem: {} }, action) => {
    switch (action.type) {
        case MENUITEM_UPDATE_REQUEST:
            return { loading: true }

        case MENUITEM_UPDATE_SUCCESS:
            return { loading: false, success: true, menuItem: action.payload }

        case MENUITEM_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case MENUITEM_UPDATE_RESET:
            return { menuItem: {} }

        default:
            return state
    }
}