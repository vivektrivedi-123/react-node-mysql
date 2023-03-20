import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './auth.scss'
import { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const {login} = useContext(AuthContext)
  
  const [users,setUsers] = useState({email:"",password:""})
  const navigate = useNavigate()
  const handleChange =(e)=>{
    setUsers(pre=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await login(users)
       navigate('/')
      
    } catch (error) {
      //console.log(error.response.data)
       toast.error(error.response.data)
     
    }
  }

  return (
    <div className='login'>
      <Navbar/>
      <div className="login-data">
      <img src='https://images.pexels.com/photos/839443/pexels-photo-839443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='dd'/>
    <form className="login-box">
      <h1>To Create Your Blog</h1>
      <div className="login-content">
      <div className="input-email">
      <input type="email" placeholder='username' name='email' onChange={handleChange} required />
      </div>
      <div className="input-password">
      <input type="password" placeholder='password'  name='password' onChange={handleChange} required />
      </div>
      </div>
      <div className="auth-btn">
      <button onClick={handleSubmit}>Let me in</button>

      <Link to='/register' className='reg'>
       don't have account ? Register
        </Link>
      </div>
    </form>
      </div>
    </div>
  )
}

export default Login