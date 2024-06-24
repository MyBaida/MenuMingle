
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listMenuItems } from '../actions/menuItemActions'
import SquareCard from '../components/SquareCard'
import RoundCard from '../components/RoundCard'
import {Link} from 'react-router-dom'

const AdminHome = () => {

  const dispatch =useDispatch()
  
  const menuItemList = useSelector(state => state.menuItemList)
  const {error, loading, menuItems} = menuItemList
    useEffect(() => {
      
        dispatch(listMenuItems())
        
    }, [dispatch])

  return (

    <>
   
   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: '80px', marginBottom:'40px', backgroundColor: '#e87f09' }}>
      <h3 className="logo" style={{ margin: '0' }} >
        <Link to='/admin/home' style={{ textDecoration: 'none', color: 'white' }}>
          MenuMingle
        </Link>
      </h3>
      
    </div>
    <h4 ><Link style={{textDecoration:'none', marginLeft:'1.5%'}} to='/admin/dashboard'>Go to Admin Panel</Link></h4>
    
    
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

          </>
  )
}

export default AdminHome
