import React ,{useState , useEffect} from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link, useLocation} from 'react-router-dom'
import './style.scss'
import axios from 'axios'
import Footer from '../components/footer/Footer'
import Loading from '../components/loader/Loading'
import ReactPaginate from "react-paginate";
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Home = () => {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)
  const {currentUser} = useContext(AuthContext)
  
  const cat = useLocation().search
  //console.log(cat)

  const fetchPosts =async()=>{
    setLoading(true)
    const res = await axios.get(`/v1/blogs/${cat}`)
    setPosts(res.data.reverse())
    setLoading(false)
  }

  useEffect(()=>{
    fetchPosts()
  },[cat])

  const [pageNumber,setPageNumber] = useState(0)
  const blogPerPage = 5
  const pagesVisited = pageNumber * blogPerPage;

  // const displayblogs = blogs.slice(pagesVisited, pagesVisited + blogPerPage).map((item)=>(
  //   <blogShop blog={item} key={item.id}/>
  // ))

  const pageCount = Math.ceil(posts.length/blogPerPage)

  const handlePageClick =({selected})=>{
    setPageNumber(selected)
    window.scrollTo(0,0)
  }

  // for avoiding the html tag
  
  const avoidHtml =(html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className="home-post">
         
        {loading ?<Loading/>:(
           posts.slice(pagesVisited, pagesVisited + blogPerPage).map((post)=>(
            <div className="h-post" key={post.id}>
              <div className="img">
                <img src={`/upload/${post.img}`} alt={post.title} />
              </div>
              <div className="content">
                  <h1>{post.title}</h1>
                  <p>{avoidHtml(post.desc)}</p>
                  {
                    currentUser ?  <Link className='read' to={`/post/${post.id}`}>read more</Link> :<Link className='read' to='/login'>read more</Link>
                  }
              </div>
            </div>
          ))
        )}
      </div>
      <div className="shop-pegination">
     <ReactPaginate
       previousLabel={"<< Previous"}
       nextLabel={"Next >>"}
       onPageChange={handlePageClick}
       pageCount={pageCount}
       pageClassName="page-item-none"
       containerClassName={"paginationBttns"}
       previousLinkClassName={"previousBttn"}
       nextLinkClassName={"nextBttn"}
       disabledClassName={"paginationDisabled"}
       activeClassName={"paginationActive"}
     />
   </div>
      <Footer/>
    </div>
  )
}

export default Home