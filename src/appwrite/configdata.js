import conf from "../config/config";
import {Client,Databases,Storage,Query,ID} from "appwrite"

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId); 
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,userID,status}){
        try{

            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            ) 

        }catch(error){
            console.log(error);

        }

    }
    // slug here is the id for the doocument
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log(error)

        }

    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionId,
                slug
            )
            return true
            
        } catch (error) {
            console.log(error);
            return false     
        }
    }

    async getPost(slug){
        try {return await this.databases.getDocument(
            conf.appwriteDatabaseid,
            conf.appwriteCollectionId,
            slug
        )
            
        } catch (error) {
            console.log(error)
            
        }   
     }
// query can only be used if you have created index
// you can also define queries in the parameters of .listDocuments
    async getAllposts(queries=[Query.equal("status","active")]){
          try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionId,
                queries,        
            )
            
          } catch (error) {
            console.log(error)
            
          }
    }

    // file uploading

    async uploadFile(file){
        try {
             return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file

             )
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true

        } catch (error) {
            console.log(error);
            
        }
    }

    getFilePreview(fileid){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileid
        )
    }
 
}


const service=new Service()
export default service