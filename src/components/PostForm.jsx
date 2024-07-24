import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from './index'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../appwrite/configdata';


export default function PostForm({post}) {
    // all these are other properties of useForm
    // The watch function allows you to watch the values of the form fields and 
    // re-render your component when those values change. It can be used to monitor individual fields or the entire form.

    // control object from react-hook-form is used in conjunction with the Controller component to manage the state and validation
    //  of complex or custom form components that are not directly compatible with the register method. In this case, control is used 
    // to integrate the TinyMCE rich text editor (Editor component) within the form.
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title ||"",
            slug:post?.slug||"",
            content:post?.content||"",
            status:post?.status||"active"
        }
    })
    const navigate=useNavigate()
    const userData=useSelector(state=> state.auth.userData);
    // The data parameter in the submit function is an object containing the current values of all form fields. For example, 
    // if the form includes fields for title, slug, content, image, and status, the data object will have corresponding properties 
    // with the values entered by the user.
    const submit = async (data)=>{
        if(post){
            // here from the data we get from useForm  data.image[0] itself is the file which will be saved
            const file= data.image[0] ? await service.uploadFile(data.image[0]) :null

            //if there is a data from useForm then we delete the feactured image of existing post to give it a new one
            if (file){
                service.deleteFile(post.featuredImage);
            }
            
            // on updating the post we give a new id which belongs to the uploaded data file 
            // to  the featured image thus the existing feactured image of the post is updated
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            // then we navigate
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        }
        // incase we dont get a existing post then
        else {
            // first we uplod the new file from the useForm editor
            const file = await service.uploadFile(data.image[0]);
            
            // we use store to get userData from the file which is needed in .createPost
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } 
    } 
    // useCallback is used to avoid rerenders and efficiency by memoizing and updating on dependecy chnge

    const slugTransform=useCallback((value)=>{
        if(value&& typeof value ==='string'){
            return value
            .trim()
            .toLowerCase()
            // this changes all spaces to hyphen
            .replace(/\s/g,'-')

            // if there is no value then return empty string

        }
         return ''
    },[])

    useEffect(()=>{
        // When a change occurs, it calls the provided callback with value (the form values) and { name } (information about the changed field).
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                // The { shouldValidate: true } option tells the form library to run any validation rules associated with the 'slug' field after updating its value.
// This ensures that the new value for 'slug' is immediately checked for correctness according to the form's validation schema or rules.
// If the new slug value violates any validation rules, the form will display corresponding validation errors.
                setValue('slug',slugTransform(value.title),{shouldValidate: true})
            }

        })

        return ()=>{
            subscription.unsubscribe()
        }

    },[watch,slugTransform,setValue])
    
    
  return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

