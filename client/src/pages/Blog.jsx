import React ,{useState} from 'react'
import './style.scss'
import Navbar from '../components/navbar/Navbar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'


const Blog = () => {
  const state = useLocation().state
  const [value,setValue] = useState(state?.desc || '')
  const [title,setTitle] = useState(state?.title || '');
  const [file,setFile] = useState('')
  const [cat,setCat] = useState(state?.cat || '')
  const navigate = useNavigate()
  const upload = async()=>{
    try {
       const formData = new FormData();
       formData.append('file',file)
       const res = await axios.post('/upload',formData)
       return res.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const imageUrl = await upload()
    try {
     const res = state ? await axios.put(`/v1/blogs/${state.id}`,{
        title , desc:value , cat , img:file ? imageUrl:''
      }) : await axios.post('/v1/blogs',{
        title, desc:value,cat, img:file? imageUrl:'',
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      });
      toast.success(res.data)
      navigate('/')
      
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className='blog'>
      <Navbar/>
      <div className="blog-content">
        <div className="b-content">
        <input type="text" placeholder='Enter your blog title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <div className="editor-content">
          <ReactQuill className="editor" theme='snow' value={value} onChange={setValue}/>
        </div>
        </div>
      <div className="b-menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:'none' }} type="file" id='file' name="file"  onChange={(e)=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1 style={{color:'#555',fontSize:'20px',marginBottom:"10px"}}>Category</h1>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'8px'}}>
          <input type="radio" checked={cat==='science'} name='cat' value='science' id='science' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='science'>Science</label>
          </div>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
          <input type="radio" checked={cat==='technology'} name='cat' value='technology' id='technology' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='technology'>Technology</label>
          </div>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
          <input type="radio" checked={cat==='cinema'} name='cat' value='cinema' id='cinema' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
          <input type="radio" checked={cat==='city'} name='cat' value='city' id='city' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='city'>City</label>
          </div>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
          <input type="radio" checked={cat==='food'} name='cat' value='food' id='food' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='food'>Food</label>
          </div>
          <div className="cat"  style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
          <input type="radio" checked={cat==='nature'} name='cat' value='nature' id='nature' onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor='nature'>Nature</label>
          </div>
          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
             <input type="radio" checked={cat==='animal'} name='cat' value='animal' id='animal' onChange={(e)=>setCat(e.target.value)} />
             <label htmlFor='animal'>Animal</label>
          </div>

          <div className="cat" style={{display:'flex',gap:'5px',marginBottom:'5px'}}>
             <input type="radio" checked={cat==='beauty'} name='cat' value='beauty' id='beauty' onChange={(e)=>setCat(e.target.value)} />
             <label htmlFor='beauty'>Fashion</label>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  )
}

export default Blog