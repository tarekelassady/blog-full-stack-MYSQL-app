import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [getInputs, setInputs]=useState({
    username:"",
    email:"",
    password:""
  });

  const [getErr, setErr]=useState('');

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("https://blog-api.onrender.com/api/auth/register",getInputs);
      setErr("");
      navigate("/login");

    }catch(err){

      setErr(err.response.data);

    }
    
}

  

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input required type="text" placeholder='Username' name="username" onChange={handleChange}/>
        <input required type="text" placeholder='Email' name="email" onChange={handleChange}/>
        <input required type="password" placeholder='Password' name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        <p>{getErr ? getErr : `You've registered successfully`}</p>
        <span>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register