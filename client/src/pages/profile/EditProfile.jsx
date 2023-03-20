import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../../components/navbar/Navbar'
import './edit.scss'
const EditProfile = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [user,setUser] = useState({
        username:'',email:'',image:'',bio:'',address:'',occupation:'',pin:'',country:''
    })
    //  const [profile,setProfile] =  useState({
    //     username:'',email:'',image:'',bio:'',address:'',occupation:'',pin:'',country:''
    // }) 

    const fetchUser = async()=>{
        const res = await axios.get(`/user/${id}`)
        setUser(res.data)
    }
    useEffect(()=>{
        fetchUser()
    },[id])

    const updateProfile =async(e)=>{
        e.preventDefault()
        try {
           const res = await axios.put(`/user/${id}`,user)
            toast.success(res.data)   
            navigate(`/user/profile/${id}`)
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    const handleChange =(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    } 
   

  return (
    <div className='e-profile'>
        <Navbar/>
        <div className="e-content">
        <div className="b-content">
        <input type="text" placeholder='Enter your username' name='username' value={user?.username} onChange={handleChange}/>
        <input type="email" placeholder='Enter your email' name='email' value={user?.email} onChange={handleChange}/>
        <input type="text" placeholder='Enter your occupation' name='occupation' value={user?.occupation} onChange={handleChange}/>
        <input type="text" placeholder='Enter your current address with comma' name='address' value={user?.address} onChange={handleChange}/>
        <div className="editor-content">
          <textarea placeholder='Enter about yourself' name='bio' value={user?.bio} onChange={handleChange}/>
        </div>
        <input type="text" placeholder='Enter your current address pin code' name='pin' value={user?.pin} onChange={handleChange}/>
        <input type="text" placeholder='Enter your country name' name='country' value={user?.country} onChange={handleChange}/>
        </div>
      <div className="b-menu">
        <div className="item">
          <img src={user?.image} alt='dg'/>
          <input style={{display:'none' }} type="file" id='file' name="file" />
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className="buttons">
          <button onClick={updateProfile} >Update</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
      </div>
        </div>
  )
}

export default EditProfile