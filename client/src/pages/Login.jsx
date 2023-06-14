import React, { useContext } from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {

  const [getInputs, setInputs]=useState({
    username:"",
    password:"",
  });

  const [getErr, setErr]=useState('');

  const navigate = useNavigate();

  const {login}=useContext(AuthContext);

  const handleChange=(e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      await login(getInputs);
      setErr(null);
      navigate("/");

    }catch(err){
      setErr(err.response.data);

    }
    
}
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input required type="text" placeholder='Username' name="username" onChange={handleChange}/>
        <input required type="password" placeholder='Password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        <p>{getErr}</p>
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login