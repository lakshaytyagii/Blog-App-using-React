// this file is to simplify importing values into files
const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

console.log("Appwrite URL:", conf.appwriteUrl); // Should log the URL
console.log("Appwrite Project ID:", conf.appwriteProjectId); // Should log the project ID
export default conf;