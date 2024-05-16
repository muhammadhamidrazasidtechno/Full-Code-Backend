
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"

// import routes
import UserRouter from './Routes/userRouters.js'

// import routes



const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))




app.use("/api/v1/user",UserRouter )


export {app}