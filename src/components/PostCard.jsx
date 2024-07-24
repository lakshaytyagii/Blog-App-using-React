import React from 'react'
import service from '../appwrite/configdata'
import {Link} from 'react-router-dom'

// in appwrite syntax you can only use id with $ sign 
export default function PostCard({
    $id,title,featuredImage
}) {
  console.log('PostCard Props:', { $id, title, featuredImage });
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {featuredImage ? (
            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className='rounded-xl'
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

