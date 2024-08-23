/* eslint-disable react/prop-types */


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser]=useState(null)

    useEffect(()=>{
      getUser()

    },[])

    const getUser=async()=>{
      try{
        const res=await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
        setUser(res.data);

      }
      catch(err){
        if((err.response.status === 401 && user) || (err.response.status === 403))
          console.log(err);
      }
    }
    
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}