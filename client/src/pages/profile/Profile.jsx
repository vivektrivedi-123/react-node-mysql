import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Link , useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import "./profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [blog, setBlog] = useState([]);
  const [user,setUser] = useState()
  const fetchBlog = async () => {
    const res = await axios.get("/v1/blogs");
    setBlog(res.data);
    //console.log(res.data)
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  // console.log(currentUser.id)
  // console.log(blog)

  const filterdBlog = blog.filter((b) => {
    return b.uid === currentUser.id;
  });
  // console.log(filterdBlog)

  const fetchUser = async () => {
    const res = await axios.get(`/user/${id}`);
    setUser(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-data">
        <img
          src="https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
        />
        <div className="pro-img">
          {user?.image ? (
            <img src={user?.image} alt="wd" />
          ) : (
            <span>{user?.username[0]}</span>
          )}
        </div>
        <div className="pro-content">
          <Link to={`/edit/profile/${id}`}>Update Profile</Link>
          <div className="pro-left">
            <h2>{user?.username}</h2>
            <p>{user?.occupation}</p>
            <span>{user?.email}</span>
            <div className="pro-desc">{user?.bio}</div>
            <div className="links">
              <span>
                <a href="https://www.linkedin.com/in/shivamup" target="_blank">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </span>
              <span>
                <a
                  href="https://github.com/Shivamup99?tab=repositories"
                  target="_blank"
                >
                  <i className="ri-github-fill"></i>
                </a>
              </span>
              <span>
                <a href="https://instagram.com/whoshivam45" target="_blank">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>
              <span>
                <a href="https://facebook.com/shivamup" target="_blank">
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              </span>
            </div>
          </div>

          <div className="pro-right">
            <h2>Your Latest Posted Blogs</h2>
            <div className="pro-right-grid">
              {filterdBlog
                ? filterdBlog.map((item) => (
                    <div className="blog-data" key={item.id}>
                      <Link to={`/post/${item.id}`}>
                        <img src={`/upload/${item.img}`} alt={item.title} />
                      </Link>
                    </div>
                  ))
                : "No Blog Posted yet by you 🧡"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
