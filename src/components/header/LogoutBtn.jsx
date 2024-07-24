import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        // most stuff from authService object is a promise
        // here backend appwrite function returns a promise 
        // we use .then to update this value in store (context)
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
   <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
   onClick={logoutHandler}
   >Logout</button>
  )
}

export default LogoutBtn