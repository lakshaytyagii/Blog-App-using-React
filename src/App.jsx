import { useState,useEffect } from 'react';
import './App.css'
import {useDispatch} from 'react-redux'
import authService, { AuthService } from './appwrite/auth';
import { login,logout } from './store/authSlice';
import {Header} from './components';
import { Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  // This is the syntax to import a .env file variable
// console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setLoading]=useState(true);
  // disptach to use reducers here
  const dispatch=useDispatch();
// constructor to run on running the app
  useEffect(()=>{
    // we get currentuser and .then method access it to apply action on it and storing it in userData attribute
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false));
    // finally is run compulsarily in the end so that we trun loading false and the content is shown

  },[])


  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
    <div className='w-full block'>
      <Header/>
      todo:
      <Outlet/>
      <Footer/>

    </div>

    </div>

  ):null
}

export default App
