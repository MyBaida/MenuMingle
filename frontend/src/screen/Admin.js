import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  '../css/style.css';
import  '../screen/Styling';
import CardStyling from '../screen/Styling';



const AdminDashboard = ({ onChange }) => {


  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
        navigate('/admin/login')
    }
    
  }, [userInfo, navigate]
  );

  const returnHandler = (event) => {
    navigate('/admin/home')
  };




  const handleColorChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className='grid-container' >
      
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    <div style={{ marginLeft:'19%', marginTop:'2%' , display:'flex', justifyContent:'center'}}>
    
    <h2 style={{position: 'absolute', top: '40px'}}> Admin Panel</h2>

    <CardStyling />
  
      <div className='styling-card' style={{marginLeft:'70px'}}
>
    <label htmlFor="colorPicker">Select Background Color:</label>
    <input className='color'
        type="color"
        id="colorPicker"
        onChange={handleColorChange}
    />
</div>
</div>


<div>
    <h4 style={{
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'orange',
        cursor: 'pointer', 
        transition: 'color 0.3s' 
    }}
    onClick={returnHandler}
    >
        BushKe
    </h4>
</div>

    
  </div>
)}

export default AdminDashboard;