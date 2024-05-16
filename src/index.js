
import dotenv from "dotenv"
import DatabaseConnection from "./Db/index.js";
import { app } from "./app.js";

DatabaseConnection()
.then(()=>{
    app.listen(process.env.PORT || 3001 || 3002 || 5000|| 5001,()=>{
        console.log("ok "+process.env.PORT || 3001 || 3002 || 5000|| 5001);
    })
})
.catch((err)=>{
    console.log(err);
})



console.log("so");

dotenv.config({
    path: './.env'
})


















// const app = express()

// (async()=>{
// try{
//    await mongoose.connect(process.env.MONGODB_URI + '/'+ DB_NAME)
//    app.listen(process.env.PORT,()=>{
//     console.log('app is listen on process.env.PORT');
//    })

// }catch(e){
//     console.log(e);
// }
// })
// ()