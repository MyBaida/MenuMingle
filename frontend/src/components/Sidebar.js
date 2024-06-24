import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../actions/adminActions.js'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';



 

function Sidebar({openSidebarToggle, OpenSidebar}) {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.adminLogin.userInfo)

    const logoutHandler=()=>{
        dispatch(logout())
      }

      

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""} style={{width:'250px'}}>
        <div className='sidebar-title'>
            <div className='sidebar-brand' style={{color: '#9e9ea4'}}>
                 {userInfo && userInfo.name &&(
                    <h5>Hi, {userInfo.name}</h5>
                )}
                
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/admin/dashboard'>
                    <BsGrid1X2Fill className='icon'/> Admin Styling
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/admin/menuItemlist'>
                    <BsFillArchiveFill className='icon'/> Menu Items
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/admin/categorylist'>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/admin/tablelist'>
                    <BsPeopleFill className='icon'/> Tables
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to='/admin/orderlist'>
                    <BsFillGrid3X3GapFill className='icon'/> Orders
                </Link>
            </li>
           
            {/* <li className='sidebar-list-item'>
            <Link to='/admin/qrcode'>
           
        Generate QR Code
      
                  </Link>
            </li> */}
            <li className='sidebar-list-item'>
                <button onClick={()=> {logoutHandler()}}>
                    <BsFillGearFill className='icon'/> logout
                </button>
            </li>

            
        </ul>
    </aside>
  )
}

export default Sidebar