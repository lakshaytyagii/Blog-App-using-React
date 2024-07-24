import React from 'react'
import { Container,PostForm } from '../components'
import { useState,useEffect } from 'react'
import { Service } from '../appwrite/configdata'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
   const [post,setPost]=useState(null)
//    this is from react router dom useParams
   const {slug}=useParams()
   const navigate=useNavigate();

   useEffect(()=>{
    if(slug){
        Service.getPost(slug),then((post)=>{
            if(post){
                setPost(post)
            }
        })
    }
   },[slug,navigate])

  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}></PostForm>
        </Container>
    </div>
  ) : <div>no posts here</div>
}

export default EditPost