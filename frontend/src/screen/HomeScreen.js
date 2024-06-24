import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMenuItems } from '../actions/menuItemActions';
import Loader from '../components/Loader'
import Header from '../components/Header';
import SquareCard from '../components/SquareCard';
import RoundCard from '../components/RoundCard';
import Footer from '../components/Footer';
import Cat from '../components/Cat';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const [tableExists, setTableExists] = useState(false); 
  

  const menuItemList = useSelector(state => state.menuItemList)
    const {error, loading, menuItems} = menuItemList
      

  useEffect(() => {
    fetchTables();
    dispatch(listMenuItems())
  }, [dispatch]);

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/menuItems/tables');
      if (response.ok) {
        const data = await response.json();
        
        
        const tableExists = data.some(table => table._id === Number(id));
        setTableExists(tableExists);

        if (tableExists) {
          localStorage.setItem('tableId', id);
          
        }
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  if (!tableExists) {
    
    return <div>Table does not exist.</div>;
  }

  
  return (
    <>
    
      <Header />
      <Cat />
      {loading ? <Loader/> 
          : error ? <h2>{error}</h2>
          :
      <div className='dashboard-content'>
       {menuItems.map((menuItem) => (
        <div key={menuItem._id}>
          {menuItem.card_type === 'square' ? (
            <SquareCard menuItem={menuItem} />
          ) : (
            <RoundCard menuItem={menuItem} />
          )}
        </div>
      ))}
    </div>
  }
  {/* <div style={{ position: 'relative', bottom: 0, width: '100%', backgroundColor: 'white', textAlign: 'center', padding: '5px 0', height: '80px' }}>
      <hr />
      <p style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>Copyright &copy; Food | Powered by iBit Soft Interns</p>
    </div> */}
    <Footer/>
    </>
  );
};

export default HomeScreen;

