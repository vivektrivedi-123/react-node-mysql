import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Blog from './pages/Blog'
import Single from './pages/Single'
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
const App = () => {
  return (
    <BrowserRouter>
    <div className='app'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<Blog/>}/>
      <Route path='/post/:id' element={<Single/>}/>
      <Route path='/user/profile/:id' element={<Profile/>}/>
      <Route path='/edit/profile/:id' element={<EditProfile/>}/>
     </Routes>
   </div>
   <ToastContainer/>
    </BrowserRouter>
  )
}

export default App