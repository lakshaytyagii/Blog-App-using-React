import React from 'react'
import { useState,useEffect } from 'react'
import { Container,PostCard } from '../components' 
import service  from '../appwrite/configdata'


function AllPost() {
    const [posts,setPosts]=useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await service.getAllposts();
                if (posts) {
                    setPosts(posts.documents);
                    // console.log(posts.documents);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, []);
    
    posts.map((post)=>console.log(post.$id));
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    
                    <div key={post.$id}>
                        <PostCard $id={post} title={post.title} featuredImage={post.featuredImage}/>

                    </div>
                    

                ))}
            </div>
        </Container>

    </div>
  )
}

export default AllPost