import React from 'react'
import './style.scss'
import Navbar from '../components/navbar/Navbar'
import Menu from '../components/menu/Menu'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import moment from 'moment'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import {toast} from 'react-toastify'
import Loading from '../components/loader/Loading'
import Footer from '../components/footer/Footer'
const Single = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [blog,setBlog] = useState({})
  const fetchAPost = async()=>{
    setLoading(true)
    const res = await axios.get(`/v1/blogs/${id}`)
    setBlog(res.data)
    setLoading(false)
  // console.log(res)
  }
  useEffect(()=>{
    fetchAPost()
  },[id])
  
  const handleDelete =async()=>{
    try {
      const res = await axios.delete(`/v1/blogs/${id}`)
      toast.success(res.data)
      navigate('/') 
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const avoidHtml =(html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <Navbar/>
      {loading ? <Loading/> :(
         <div className="single-page">
         <div className="s-content">
           <img src={`/upload/${blog.img}`} alt="dd" />
           <div className="s-user">
             {blog.image===null ? <span className='array'>{blog.username[0]}</span> : <img src={blog?.image} alt={blog.id} />}
             
             <div className="info">
               <div className="info-content">
               <span>{blog?.username}</span>
               <p>posted {moment(blog.date).fromNow()}</p>
               </div>
              
               <div className="info-btn">
               { currentUser.username === blog.username ?
               <>
                 <Link className='edit' to={`/create?edit=${id}`} state={blog}><i className="ri-pencil-fill"></i></Link>
                 <button className='delete' onClick={handleDelete}><i className="ri-delete-bin-2-line"></i></button>
               </> : null
               }
               </div>
             
             </div>
           </div>
           <h1 className="title">{blog?.title}</h1>
           <div className="desc">
             {avoidHtml(blog?.desc)}
           </div>
         </div>
         <div className="s-menu">
           <Menu cat={blog?.cat} />
         </div>
       </div>  
      )}
      <Footer/>
    </div>
  )
}

export default Single