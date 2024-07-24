import React from 'react'
import { useState,useEffect } from 'react'
import { Container,PostCard } from '../components' 
import { Service } from '../appwrite/configdata'


function AllPost() {
    const [post,setPosts]=useState([])
    useEffect(()=>{
        Service.getAllposts([]).then((posts)=>{
            if(posts){setPosts(posts.documents)
    
            }
        })  
    },[])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id}>
                        <PostCard post={post}/>

                    </div>
                    

                ))}
            </div>
        </Container>

    </div>
  )
}

export default AllPost