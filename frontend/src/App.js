import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";

import HomeScreen from "./screen/HomeScreen.js";
import AdminHome from "./screen/AdminHome.js";
import CategoryListScreen from "./screen/CategoryListScreen";
import TableListScreen from "./screen/TableListScreen";
import Cart from "./screen/Cart";
import CategoryEditScreen from "./screen/CategoryEditScreen";
import CategoryCreateScreen from "./screen/CategoryCreateScreen";
import TableCreateScreen from "./screen/TableCreateScreen";
import TableEditScreen from "./screen/TableEditScreen";
import MenuItemCreateScreen from "./screen/MenuItemCreateScreen";
import MenuItemListScreen from "./screen/MenuItemListScreen";
import MenuItemEditScreen from "./screen/MenuItemEditScreen";
import OrderListScreen from "./screen/OrderScreen";
import KitchenScreen from "./screen/KitchenScreen";
import QrCode from './screen/QrCode';
import TableQrCode from './screen/TableQRcode';
import AdminLoginScreen from './screen/adminLoginScreen';
import AdminDashboard from './screen/Admin.js';
import CategoryProduct from "./screen/CategoryProduct";

function App() {
  // Site-wide background tint (admin customisation feature). Defaults to the
  // app's neutral canvas so the clean theme renders correctly out of the box.
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("backgroundColor") || "#f8fafc"
  );

  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex min-h-screen items-center justify-center px-6 text-center">
                <div className="max-w-md">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-xl font-bold text-white">
                    S
                  </span>
                  <h1 className="text-3xl font-bold text-slate-900">Served</h1>
                  <p className="mt-3 text-slate-500">
                    Scan your table's QR code, or head to{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-brand-600">/table/:id</code>{" "}
                    to view the menu.
                  </p>
                  <div className="mt-7">
                    <Link to="/table/1" className="btn-primary">
                      <FaConciergeBell className="h-4 w-4" />
                      Browse the demo menu
                    </Link>
                    <p className="mt-2.5 text-xs text-slate-400">
                      Just exploring? This opens Table 1 &mdash; no QR code needed.
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/table/:id" element={<HomeScreen />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path='/table/:id/cart/:id?' element={<Cart />} />
          <Route path='/category/:name/:id' element={<CategoryProduct />} />
          <Route path='/admin/categorylist' element={<CategoryListScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/kitchen' element={<KitchenScreen />} />
          <Route path='/admin/tablelist' element={<TableListScreen />} />
          <Route path='/admin/table/create' element={<TableCreateScreen />} />
          <Route path='/admin/table/:id/edit' element={<TableEditScreen />} />
          <Route path='/admin/qrcode' element={<QrCode />} />
          <Route path='/admin/table/:id/qrcode' element={<TableQrCode />} />
          <Route path='/admin/category/:id/edit' element={<CategoryEditScreen />} />
          <Route path='/admin/category/create' element={<CategoryCreateScreen />} />
          <Route path='/admin/menuItem/create' element={<MenuItemCreateScreen />} />
          <Route path='/admin/menuItemlist' element={<MenuItemListScreen />} />
          <Route path='/admin/menuItem/:id/edit' element={<MenuItemEditScreen />} />
          <Route path='/admin/login' element={<AdminLoginScreen />} />
          <Route path='/admin/dashboard' element={<AdminDashboard onChange={handleColorChange} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
