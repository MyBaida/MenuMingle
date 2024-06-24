import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';

const CardStyling = ({ onUpdateCardType }) => {
    const [selectedCardType, setSelectedCardType] = useState('square');
    
    const navigate = useNavigate()

    const userInfo = useSelector(state => state.adminLogin.userInfo)

    useEffect(() => {

        if (!userInfo || !userInfo.isAdmin) {
          navigate('/admin/login')
        }
      }, [ navigate, userInfo]);

      useEffect(() => {
        const storedCardType = localStorage.getItem('selectedCardType');
        if (storedCardType) {
            setSelectedCardType(storedCardType);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            await fetch('/api/menuItems/update-card-type/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ card_type: selectedCardType }), // Use the selected card type
            });
            localStorage.setItem('selectedCardType', selectedCardType)
            // window.location.reload()
            navigate("/admin/home")
        } catch (error) {
            console.error('Error updating card type setting:', error);
        }
    };

    return (
        
        <div  className='styling-card'>
                <h5>Select Card Type</h5>
                <form onSubmit={handleSubmit}>
                    <label style={{margin:'5px'}}>
                        <input type="radio" value="round" checked={selectedCardType === 'round'} onChange={(e) => setSelectedCardType(e.target.value)} />
                        Horizontal Card
                    </label><br/>
                    <label style={{margin:'5px', paddingBottom:'5px'}}>
                        <input type="radio" value="square" checked={selectedCardType === 'square'} onChange={(e) => setSelectedCardType(e.target.value)} />
                        Vertical Card
                    </label><br/>
                    <button type="submit" className='cart-btn'>Save</button>
                </form>
                </div>
        
    );
};

export default CardStyling;
