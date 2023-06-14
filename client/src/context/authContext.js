import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext =createContext();

export const AuthContextProvider=({children})=>{
    const [getCurrentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))|| null);

    const login=async(inputs)=>{
        const res = await axios.post("https://blog-api.onrender.com/api/auth/login",inputs);
        setCurrentUser(res.data);
    }

    const logout=async()=>{
        console.log("logging out");
        await axios.post("https://blog-api.onrender.com/api/auth/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(getCurrentUser))

    },[getCurrentUser]);

    return(
        <AuthContext.Provider value={{getCurrentUser,login,logout}}>{children}</AuthContext.Provider>
    )
}