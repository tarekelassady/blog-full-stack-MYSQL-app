import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=(req,res)=>{

    //Check existing user
    const q="SELECT * FROM tblusers WHERE username=? OR email=?";
    db.query(q,[req.body.username,req.body.email], (err,data)=>{
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists");

        //Hash the password

        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        //Create new user
        const q="INSERT INTO tblusers (username, email, password) VALUES (?)";
        const values=[
            req.body.username,
            req.body.email,
            hash,
        ]
        
        db.query(q,[values],(err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User has been created successfully");
        })

        
    })
}
export const login=(req,res)=>{
    const q="SELECT * FROM tblUsers WHERE username=?";
    db.query(q,[req.body.username],(err,data)=>{
        //Check existing username
        if (err) return res.json(err);
        if (data.length===0) return res.status(404).json("User doesn't exist");
        //Check correct password
        const isPasswordCorrect= bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");
        //If there is no errors then login
        const token=jwt.sign({id:data[0].id},"jwtkey");
        const {password, ...other}=data[0];
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(other);


    });
}
export const logout=(req,res)=>{
    
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true,
    }).status(200).json("User has been logged out.");
}