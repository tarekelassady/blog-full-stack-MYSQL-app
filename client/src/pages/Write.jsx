import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { AuthContext } from '../context/authContext';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


const Write = () => {
  const state=useLocation().state;
  const [getTitle,setTitle]=useState(state?.title || "");
  const [getDescription, setDescription]=useState(state?.description||"");
  const [getFile, setFile]=useState(null);
  const [getCat,setCat]=useState(state?.cat||"");
  const [getArticle, setArticle]=useState({
    title:"",
    description:"",
    img:"",
    cat:"",
    userId:null
  });
  const {getCurrentUser}=useContext(AuthContext);
  const navigate=useNavigate();

  const upload=async()=>{
    try{
      const formData=new FormData();
      formData.append("file",getFile);
      const res= await axios.post("https://blog-api.onrender.com/api/upload",formData);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

  const handleChange=(e)=>{
    try{
      setArticle(prev=>({...prev,[e.target.name]:e.target.value}))
      console.log(getArticle);
    }catch(err){
      console.log(err);
    }
  }

  const handleClick=async(e)=>{
      e.preventDefault();
      const imgUrl=await upload();
    try{
      state ?
      await axios.put(`https://blog-api.onrender.com/api/posts/${state.postId}`,{
        getTitle,
        getDescription,
        getCat,
        img:getFile ? imgUrl:"",
        userId:getCurrentUser.id
        })
      :
      await axios.post('https://blog-api.onrender.com/api/posts/',{
        getTitle,
        getDescription,
        getCat,
        img:getFile?imgUrl:"",
        date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userId:getCurrentUser.id});
      // setArticle(prev=>({...prev,userId:getCurrentUser.id}))
      // await axios.post("/posts",getArticle);
      // console.log("Article has been added successfullyyy");
      // console.log(getArticle);


    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={getTitle} placeholder='Title' name='title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className='editor' value={getDescription} onChange={setDescription} theme='snow' name='description' />
        </div>
        
      </div>
      <div className="menu">
        <div className="item">
          <h2>Publish</h2>
          <span><b>Status: </b>Draft</span>
          <span><b>Visibility: </b>Publich</span>
          <input type="file" id="file" name="img" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
          <label className='file' htmlFor="file">Upload File</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={getCurrentUser ? handleClick:navigate("/login")}>Update</button>
          </div>

        </div>
        <div className="item">
          <h2>Category</h2>
          <div className="cat">
            <input type="radio" name="cat" value="art" checked={getCat==="art"} onChange={e=>setCat(e.target.value)} id="art"/>
            <label htmlFor="art">Art</label></div>
          <div className="cat">
            <input type="radio" name="cat" value="science" checked={getCat==="science"} onChange={e=>setCat(e.target.value)} id="science"/>
            <label htmlFor="science">Science</label></div>
          <div className="cat">
            <input type="radio" name="cat" value="technology" checked={getCat==="technology"} onChange={e=>setCat(e.target.value)} id="technology"/>
            <label htmlFor="technology">Technology</label></div>
          <div className="cat">
            <input type="radio" name="cat" value="cinema" checked={getCat==="cinema"} onChange={e=>setCat(e.target.value)} id="cinema"/>
            <label htmlFor="cinema">Cinema</label></div>
          <div className="cat">
            <input type="radio" name="cat" value="design" checked={getCat==="design"} onChange={e=>setCat(e.target.value)} id="design"/>
            <label htmlFor="design">Design</label></div>
          <div className="cat">
            <input type="radio" name="cat" value="food"  checked={getCat==="food"} onChange={e=>setCat(e.target.value)} id="food"/>
            <label htmlFor="food">Food</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write