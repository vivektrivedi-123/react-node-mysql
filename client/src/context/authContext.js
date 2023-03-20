import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AuthContext = createContext()


export const AuthContextProvider =({children})=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user"))||null)

    const login = async(users)=>{
        try {
            const response = await axios.post('/auth/login',users)
           // toast.success(response.data)
            setCurrentUser(response.data)
           // console.log(response)
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    const logout = async()=>{
        const res=await axios.post('/auth/logout')
        setCurrentUser(null)
        toast.success(res.data)
      }

      useEffect(()=>{
       localStorage.setItem("user",JSON.stringify(currentUser))
      },[currentUser])

      return (
        <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
      )
}

