import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function DatabaseConnection() {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
         console.log(`app is listen on ${process.env.MONGODB_URI}`);
        

     
     }catch(e){
         console.log(e);
     }
}

export default DatabaseConnection;