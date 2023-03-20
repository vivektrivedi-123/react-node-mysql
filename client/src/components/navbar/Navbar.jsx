import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./nav.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)

  const handleLogout =async()=>{
     await logout()
     setOpen(!open)
     navigate('/')
  }
  const handleDrop =()=>{
     setOpen(!open)
  }
  return (
    <div className="navbar">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://cdn.dribbble.com/users/1158215/screenshots/15977619/media/ef1e3e49c069f9c7ade5e28fd7fc7d00.jpg?compress=1&resize=400x300"
            alt="djd"
          />
        </Link>
        <div className="nav-left">
          <NavLink to="/?cat=science">Science</NavLink>
          <NavLink to="/?cat=technology">Technology</NavLink>
          <NavLink to="/?cat=cinema">Cinema</NavLink>
          <NavLink to="/?cat=food">Foods</NavLink>
          <NavLink to="/?cat=nature">Nature</NavLink>
          <NavLink to="/?cat=animal">Animals</NavLink>
          <NavLink to="/?cat=beauty">Fashion</NavLink>
          <NavLink to="/?cat=city">Bali</NavLink>

          <div className="nav-auth" >
           
            {currentUser ? (
               <div className="auth-model" onClick={handleDrop}>
                {currentUser.image === null ? (
                <span>{currentUser.username[0]}</span>
              ) : (
                <img
                  src={currentUser.image}
                  alt={currentUser.id}
                />
              )}
               </div>  
            )
            : (
              // <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQumv-mukFg5cl2QVjlq3J0wq985H9wRNvw&usqp=CAU' alt='dkdk'/>
              <Link to="/login">Login</Link>
            )}
            
            {open &&
             <div className="drop">
            <div className="drop-data">
              <Link to={`/user/profile/${currentUser.id}`}>Profile</Link>
              <p onClick={handleLogout}>Logout</p>
            </div>
            </div> 
            }
            </div>
          {currentUser && <NavLink to="/create">Write</NavLink>}
        </div>
      
      </div>
    </div>
  );
};

export default Navbar;
