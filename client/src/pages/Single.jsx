import React, { useEffect, useState,useContext } from 'react'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Menu from "../components/Menu"
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from "../context/authContext"


const Single = () => {

  const [getPost,setPost]=useState({});
  const location=useLocation();
  const postId=location.pathname.split("/")[2];
  const {getCurrentUser}=useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get(`https://blog-api.onrender.com/api/posts/${postId}`);
      setPost(res.data);    
    }
    fetchData();
    console.log(getCurrentUser.id);
    console.log(getPost.userId)
  },[]);

  const handleDelete=async()=>{
    try{
      let answer=window.confirm("Delete?");
      if (answer){
    await axios.delete(`https://blog-api.onrender.com/api/posts/${postId}`);
    navigate("/");
  }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`/upload/${getPost?.postImg}`} alt="" /> {/* ? here means if the image is loading it will give me an error */}
        <div className="user">
          {getPost.userImg &&<img src={getPost?.userImg} alt="" />}
          <div className='info'>
            <span>{getPost.username}</span>
            <p>Posted {moment(getPost.date).fromNow()}</p>
          </div>
          {getCurrentUser.id===getPost.userId &&
          <div className="edit">
            <Link to="/write?edit=1" state={getPost}>
            <img src={Edit} alt="" />
            </Link>
            <Link>
            <img onClick={handleDelete} src={Delete} alt="" />
            </Link>
          </div>
          }
        </div>
        <h1>{getPost.title}</h1>
        {getPost.description}
      </div>
      <div className="menu">
        <Menu postCat={getPost.cat} postId={getPost.postId}/>
      </div>
    </div>
  )
}

export default Single