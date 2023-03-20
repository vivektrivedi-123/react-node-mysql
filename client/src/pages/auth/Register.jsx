import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './auth.scss'
import axios from 'axios'
import { useState } from 'react'
const Register = () => {
  const [users,setUsers] = useState({email:"",username:"",password:""})
  const navigate = useNavigate()
  const handleChange =(e)=>{
    setUsers(pre=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
       const res = await axios.post('/auth/register',users)
       toast.success(res.data)
       navigate('/login')
      
    } catch (error) {
      //console.log(error.response.data)
       toast.error(error.response.data)
     
    }
  }
  return (
    <div className='login'>
      <Navbar/>
      <div className="login-data">
      <img src='https://images.pexels.com/photos/5861326/pexels-photo-5861326.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='dd'/>
    <form className="login-box">
      <h1>To Create Your Blog</h1>
      <div className="login-content">
      <div className="input-email">
      <input type="text" placeholder='username' name='username' onChange={handleChange} required />
      </div>
      <div className="input-email">
      <input type="email" placeholder='email' name='email' onChange={handleChange} required />
      </div>
      <div className="input-password">
      <input type="password" placeholder='password'  name='password' onChange={handleChange} required />
      </div>
      </div>
      <div className="auth-btn">
      <button onClick={handleSubmit}>Let me in</button>

      <Link to='/login' className='reg'>
       have an account ? Sign in
        </Link>
      </div>
    </form>
      </div>
    </div>
  )
}

export default Register