import React from 'react'
import service from '../appwrite/configdata'
import {Link} from 'react-router-dom'

// in appwrite syntax you can only use id with $ sign 
export default function PostCard({
    $id,title,feacturedImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* we use object's function with input being feactured image which will provide with bucket url and the featuredimage id */}
                <img src={service.getFilePreview(feacturedImage)} alt={title} className='rounded-xl'/>

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

