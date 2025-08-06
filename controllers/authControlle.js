import user from "../models/userschema.js"

 export const registerController=async(req,res,next)=>{
try {
          const {name,email ,password}=req.body 
          //validate
          if(!name){
                return   next("Please provide the Name")
          }

               if(!email){
                                 return     next("Please provide the email")

          }
               if(!password){
                                  return     next("Please provide the password")

          }

const existingUser=await user.findOne({email})
if(existingUser){
     next ( "Email already exists")}
          
const newUser=await user.create({name ,email,password})
//token 
const token=newUser.createJWT()//genrate token 

          res.status(201).send({sucess:true,message:"User created successfully ",
               user:{
                    name:newUser.name,
                    email:newUser.email
                    ,location:newUser.location
               },token
            
          })

         
} catch (error) {
       next(error)
}}


 export const loginController =async(req,res,next)=>{

     const{email,password}=req.body

     //validation 
     if(!email|| !password){
          return next("Please provide all field")
     }
///find user by email(extra security)
     const neuser=await user.findOne({email}).select("+password")
     if(!neuser){
       return   next("Invalid Username and Password")
     }
     //compare Password
     const isMatch=await neuser.comparePassword(password)
     if(!isMatch){
       return   next("Invalid password ")
     }
          const token =neuser.createJWT()
          res.status(200).json({
               success:"true",
               message:"login duccessfull",token
          })
     

}



