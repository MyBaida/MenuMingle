
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/adminActions';
import '../css/App.css'
import {useNavigate} from 'react-router-dom'


function AdminLoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const adminLogin = useSelector(state => state.adminLogin);
    const { error, loading, userInfo } = adminLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) { 
            navigate('/admin/dashboard')
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    };

    return (
        
            <div className='form-container'>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <form  className='login-form' onSubmit={submitHandler}>
            <h2 className='heading'> Admin Login </h2>

          
            <input required type='email' className='email' placeholder='📧 Email' value={email} onChange={(e)=> setEmail(e.target.value) }/>

            <input required type='password' className='password' placeholder='🔐 Passoword' value={password} onChange={(e)=> setPassword(e.target.value)}/>


            <h3 className='btn' onClick={submitHandler}>Log In</h3>
            

            </form>


            </div>
       
    );
}

export default AdminLoginScreen;


