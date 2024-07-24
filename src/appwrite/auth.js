import conf from "../config/config";
import {Client,Account,ID} from "appwrite"
import handleLogin from "./testing";

// in this file we make the functions required based on the appwrite documentation
// we make a class so that we can create a object containing all the properties of this class
// we export that object

export class AuthService{
    account;
    // acccount is just declared as a refrence and it is defined in the constructor
    // benefit is that the constructor is initiated on the creation of the class
    constructor(){
        this.client=new Client();
         // creates a object and the constructor puts in the values required like url and projectid
        // console.log("Appwrite URL:", conf.appwriteUrl); // Debug log
        // console.log("Appwrite Project ID:", conf.appwriteProjectId); // Debug log
        // console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId); 
        this.account=new Account(this.client);
    }
    // in appwrite we use functionality by using promises or async await
    async createAccount({email,password,name}){
        try{
            const userAccount= await this.account.create(ID.unique(),email,password,name)

            if(userAccount){
                // call anothher method so that on account creation login takes place
                return this.login({email,password})

            }
            else{
                return userAccount;
            }

        }catch(error){
            console.error("Error creating account:", error);

            throw error;
        }

    }
    
    async login({ email, password }) {
        try {
            console.log("Attempting login with email:", email);
          const session = await this.account.createEmailPasswordSession(email, password);
          console.log("Login successful:", session);
          return session;
        } catch (error) {
          console.log("Login error:", error);
          throw error;
        }
      }
      
    // this provides if the user is logged in or not

    async getCurrentUser() {
        try {
          console.log("Fetching current user...");
          const user = await this.account.get();
          console.log("Current user:", user);
          return user;
        } catch (error) {
          console.error("Appwrite service :: getCurrentUser :: error", error);
          return null;
        }
      }
    // deletesessions logsout all of the users
    async logout(){
        try{
            await this.account.deleteSessions()

        }
        catch(error){
            console.log("Appwrite service ::logout::error",error)

        }

    }
    
}
// this object will be used to use all this functions

const authService=new AuthService();
handleLogin
export default authService
