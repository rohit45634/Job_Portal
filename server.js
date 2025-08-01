import express, { urlencoded } from "express";
import dotenv from 'dotenv';
import connectdb from "./config/db.js";
import testcontroller from "./controllers/test.js";
import cors from "cors";
import morgan from "morgan";
import validator from "validator";


//route import
import testrout from "./routes/testrout.js"
import authroute from "./routes/authroute.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";



//config dotenv
dotenv.config()

//creating express application instance
const app=express();

//mongodb connection 
connectdb()

//validation middleware
app.use(errorMiddleware)

const PORT=process.env.PORT ||8080

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))



//routes
app.use('/api/v1',testrout)
app.use('/api/v1/auth',authroute)



//listen
app.listen(PORT,()=>{`Server on PORT${process.env.PORT}`})