
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [tableId, setTableId] = useState('');

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    const tableId = localStorage.getItem('tableId');
    if (tableId) {
      setTableId(tableId);
    }
    console.log(cartItems.length)
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: '80px', marginBottom:'40px', backgroundColor: '#e87f09' }}>
      <h3 className="logo" style={{ margin: '0' }} >
        <Link to={`/table/${tableId}`} style={{ textDecoration: 'none', color: 'white' }}>
          MenuMingle
        </Link>
      </h3>
      <div style={{ position: 'relative' }}>
        <Link to={`/table/${tableId}/cart`} className="fas fa-shopping-cart" id="shop" style={{ color: 'black', textDecoration: 'none', display: 'block' }}>
          <span style={{ position: 'absolute', top: '-23px', right: '-20px', color: 'white', borderRadius: '50%', padding: '8px 12px 0px 8px'}}>{cartItems.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;

