import {db} from "../db.js"
import jwt from 'jsonwebtoken'

export const getPosts=(req,res)=>{
    const q=req.query.cat ? "SELECT * FROM tblposts WHERE cat=?":"SELECT * FROM tblposts";
    db.query(q,[req.query.cat],(err,data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
    
}

export const getPost=(req,res)=>{
    const q="SELECT p.id as postId, title,description,email,p.img AS postImg,date,cat,u.img AS userImg , userId from tblusers u JOIN tblposts p ON u.id=p.userId WHERE p.id=?"
    db.query(q,[req.params.id],(err,data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })

}

export const addPost=(req,res)=>{
    // const token=req.cookies.access_token;
    // if(!token) return res.status(401).json("Not authorized");
    // jwt.verify(token,"jwtkey",(err,userInfo)=>{
    //     if (err) return res.status(403).json("Token is not valid");

    //     const q="DELETE FROM tblposts where id=? and userId=?";
    //     db.query(q,[req.params.id,userInfo.id],(err,data)=>{
    //         if (err) return res.status(403).json("You can only delete your post");
    //         return res.status(200).json("Post has been deleted");
    // })

    // })

    const q="INSERT INTO tblposts (title,description, img, cat, date, userId) VALUES (?)";
    const values=[
        req.body.getTitle,
        req.body.getDescription,
        req.body.img,
        req.body.getCat,
        req.body.date,
        req.body.userId
    ]
    console.log(values);
    db.query(q,[values],(err,data)=>{
        if (err) return res.status(500).json(err);
        console.log("artice is added");
        return res.status(200).json("Article has been added successfully");
        
    })
}

export const deletePost=(req,res)=>{

    // const token=req.cookies.access_token;
    // if(!token) return res.status(401).json("Not authorized");
    // jwt.verify(token,"jwtkey",(err,userInfo)=>{
    //     if (err) return res.status(403).json("Token is not valid");

    //     const q="DELETE FROM tblposts where id=? and userId=?";
    //     db.query(q,[req.params.id,userInfo.id],(err,data)=>{
    //         if (err) return res.status(403).json("You can only delete your post");
    //         return res.status(200).json("Post has been deleted");
    // })

    // })

    const q="DELETE FROM tblposts where id=?";
        db.query(q,[req.params.id],(err,data)=>{
            if (err) return res.status(403).json("You can only delete your post");
            return res.status(200).json("Post has been deleted");
})
    
}

export const updatePost=(req,res)=>{
    
    // const token=req.cookies.access_token;
    // if(!token) return res.status(401).json("Not authorized");
    // jwt.verify(token,"jwtkey",(err,userInfo)=>{
    //     if (err) return res.status(403).json("Token is not valid");

    //     const q="DELETE FROM tblposts where id=? and userId=?";
    //     db.query(q,[req.params.id,userInfo.id],(err,data)=>{
    //         if (err) return res.status(403).json("You can only delete your post");
    //         return res.status(200).json("Post has been deleted");
    // })

    // })

    const q="UPDATE tblposts SET title=?,description=?, img=?, cat=? WHERE id=? AND userID=?";
    const values=[
        req.body.getTitle,
        req.body.getDescription,
        req.body.img,
        req.body.getCat,
    ]
    console.log(values ,req.params.id,req.body.userId);
    db.query(q,[...values,req.params.id,req.body.userId],(err,data)=>{
        if (err) return res.status(500).json(err);
        console.log("artice is updated");
        return res.status(200).json("Article has been updated successfully");
        
    })
}

