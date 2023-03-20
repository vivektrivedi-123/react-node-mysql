import React,{useState , useEffect} from 'react'
import './menu.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Menu = ({cat}) => {
  const navigate = useNavigate()
  const [posts,setPosts] = useState([])
  const fetchPosts =async()=>{
    const res = await axios.get(`/v1/blogs/?cat=${cat}`)
    setPosts(res.data)
  }

  useEffect(()=>{
    fetchPosts()
  },[cat])
    const handleClick =()=>{
      navigate(`/?cat=${cat}`)
    }
  return (
    <div className='menu'>
      <h2>Other posts you may like</h2>
      {
        posts.map((post)=>(
            <div className="post" key={post?.id}>
                <img src={`/upload/${post?.img}`} alt={post.title} />
                <h3>{post?.title}</h3>
                <button onClick={handleClick}>explore</button>
            </div>
        ))
      }
    </div>
  )
}

export default Menu