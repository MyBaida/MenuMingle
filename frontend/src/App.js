
import './css/App.css';

import HomeScreen from "./screen/HomeScreen.js";

import AdminHome from "./screen/AdminHome.js";

import CategoryListScreen from "../src/screen/CategoryListScreen";

import TableListScreen from "../src/screen/TableListScreen";

import Cart from "../src/screen/Cart";

import CategoryEditScreen from "../src/screen/CategoryEditScreen";
import CategoryCreateScreen from "../src/screen/CategoryCreateScreen";

import TableCreateScreen from "../src/screen/TableCreateScreen";
import TableEditScreen from "../src/screen/TableEditScreen";

import MenuItemCreateScreen from "./screen/MenuItemCreateScreen";
import MenuItemListScreen from "../src/screen/MenuItemListScreen";
import MenuItemEditScreen from "../src/screen/MenuItemEditScreen";

import OrderListScreen from "../src/screen/OrderScreen";

import QrCode from './screen/QrCode';

import TableQrCode from './screen/TableQRcode';

import AdminLoginScreen from './screen/adminLoginScreen';
import AdminDashboard from './screen/Admin.js';

import React, { useState, useEffect } from "react";



import CategoryProduct from "../src/screen/CategoryProduct";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './bootstrap.min.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("backgroundColor") || "#your-default-color-here"
  );

  // Save the background color to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };
  
  return (
   
      <div style={{ backgroundColor }}>
      
       <Router>
           {/* <Header/> */}
         <Routes>
         <Route path="/" element={<div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'20%'}}><h3>Welcome!! Please head to "/table/:id" to view Menu</h3></div> } />
           <Route path="/table/:id" element={<HomeScreen />} />

           <Route path="/admin/home" element={<AdminHome />} />

           <Route path='/table/:id/cart/:id?' element={<Cart/>} />


           <Route path='/category/:name/:id' element={<CategoryProduct/>} />


           <Route path='/admin/categorylist' element={<CategoryListScreen/>} />

           <Route path='/admin/orderlist' element={<OrderListScreen/>} />

           <Route path='/admin/tablelist' element={<TableListScreen/>} />
           <Route path='/admin/table/create' element={<TableCreateScreen/>} />
           <Route path='/admin/table/:id/edit' element={<TableEditScreen/>} />


           <Route path='/admin/qrcode' element={<QrCode/>} />
           <Route path='/admin/table/:id/qrcode' element={<TableQrCode/>} />

           <Route path='/admin/category/:id/edit' element={<CategoryEditScreen/>} />
           <Route path='/admin/category/create' element={<CategoryCreateScreen/>} />
           
           <Route path='/admin/menuItem/create' element={<MenuItemCreateScreen/>} />
           <Route path='/admin/menuItemlist' element={<MenuItemListScreen/>} />
           <Route path='/admin/menuItem/:id/edit' element={<MenuItemEditScreen/>} />


           <Route path='/admin/login' element={<AdminLoginScreen/>} />
           <Route path='/admin/dashboard' element={<AdminDashboard onChange={handleColorChange}/>} />



         </Routes>
         
       </Router>
       </div>
  );
}

export default App;
