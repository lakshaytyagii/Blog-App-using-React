import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import service from '../appwrite/configdata'
import { Button,Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'


function Post() {
    const [post,setPost]=useState(null);
    // useParams is used to get info cross pages using the url
    const {slug}=useParams();
    const navigate=useNavigate();
    // this is to get data from context storage
    const userData=useSelector((state)=>state.auth.userData);
    // here if post and userdata both are available then it checks if both userid's are equal
    //  and returns true and then true && true = true
    // otherwise is post is there but not userData then true && false = false
    const isAuthor=post&& (userData? post.userId===userData.$id : false)

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                }
                else {
                    navigate('/');
                }
            });
        }
        else{
            navigate('/');
        }
    },[slug,navigate]);

    const deletePost=()=>{
        // .deletePost returns a boolean
        service.deletePost(post.$id).then((status)=>{
            if(status){
                // .deletefile needs fileId as input
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        })

    }


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {/* content of the post is supposed to be parse before displaying it on thhe screen */}
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post