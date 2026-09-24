

import { configureStore } from '@reduxjs/toolkit';
import { menuItemListReducer, menuItemDetailsReducer, menuItemDeleteReducer, menuItemCreateReducer, menuItemUpdateReducer } from './reducers/menuItemReducers';
import { categoryListReducer, categoryDetailsReducer, categoryMenuItemsReducer, categoryDeleteReducer, categoryCreateReducer, categoryUpdateReducer } from './reducers/categoryReducers';
import { tableDetailsReducer, tableDeleteReducer, tableCreateReducer, tableUpdateReducer } from './reducers/categoryReducers';
import { adminLoginReducer } from './reducers/adminReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderDetailsReducer, orderCreateReducer } from './reducers/orderReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  adminLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    menuItemList: menuItemListReducer,
    menuItemDetails: menuItemDetailsReducer,
    menuItemDelete: menuItemDeleteReducer,
    menuItemCreate: menuItemCreateReducer,
    menuItemUpdate: menuItemUpdateReducer,

    cart: cartReducer,

    adminLogin: adminLoginReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,

    categoryList: categoryListReducer,
    categoryMenuItems: categoryMenuItemsReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDetails: categoryDetailsReducer,
  
    tableDelete: tableDeleteReducer,
    tableCreate: tableCreateReducer,
    tableUpdate: tableUpdateReducer,
    tableDetails: tableDetailsReducer,
  },
  preloadedState,
});

export default store;