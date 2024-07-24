// this is a protection machanism , actually a container
// which protects pages or routes
// we will conditionally render if its children shoudl be rendered or not 


import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {

  const navigate=useNavigate();
  const [loader,setLoader]=useState(true)

  const authStatus=useSelector(state=> state.auth.status)

  useEffect(()=>{
    // this condition means if authstatus turns out false then go to login
    // true && false!==true => true && true => true
    if(authentication && authStatus!==authentication){
        navigate("/login")
    }
    // !authentication is false and authStatus is true then
    // false && true!==true => false &&false is false                        
    else if(!authentication && authStatus!==authentication ){
        navigate("/")
    }
    setLoader(false);
    


  },[authStatus,navigate,authentication])
//   initially loader is true so it will show loading... and after authentication it will show the children 
  return loader? <h1>Loading...</h1> : <>{children}</>
}

