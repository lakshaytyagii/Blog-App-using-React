import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import service from '../appwrite/configdata'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'

// this component will be mainly about useForm from react-hook-form
export default function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("");

    // first up we clean up previous errors
    const login=async(data)=>{
        setError('');
        try {
            const session =await authService.login(data)
            if(session){
                const userdata=await authService.getCurrentUser()
                if(userdata){
                    dispatch(authLogin(userdata))
                    // difference between link and navigate is that unlike link naviagte doesnt
                    //  need to be clicked it works itself according to the code
                    // this will lead to home page
                    navigate("/")
                }
            }
            
        } catch (error) {
            setError(error.message)
            
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >

            <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Dont have any Account?
                <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error &&<p className="text-red-600 mt-8 text-center">{error}</p>}

            {/* handlesubmit is a event/method from react-hook's useform which uses our method to handle form  
            input field uses register which gives all these values directly to handleSubmit
            hhandlesubmit will handle inputs from two different input fields and pass them on as a object {email,password}*/}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label='Email:'
                    placeholder="enter your email"
                    type="email"
                    // this is a syntax to use useForm's register which is in link with handlesubmit
                    // email is key value
                    {...register("email",{
                        required:true,
                        validate:{
                            // value here becomes regular expression from regexr.com 
                            //  here /.../ is the reg-ex.test(value) which will check the value of email submitted or say its incorrect
                            matchPattern:(value)=>{
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address"

                            }
                        }
                    })}
                    />
                    {/* here we dont need validation only to mark if it is compulsory to fill this input field or not */}
                    <Input
                     label='Password:'
                     placeholder="enter your Password"
                     type="Password"
                     {...register("password",{
                        required:true
                     })}

                    />
                    <Button
                    type='submit'
                    className='w-full'>
                        Signin
                    </Button>

                </div>
            </form>

        </div>
    </div>
  )
}

