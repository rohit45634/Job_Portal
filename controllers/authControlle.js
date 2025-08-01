import user from "../models/userschema.js"

const registerController=async(req,res,next)=>{
try {
          const {name,email ,password}=req.body 
          //validate
          if(!name){
                   next("Please provide the Name")
          }

               if(!email){
                                      next("Please provide the email")

          }
               if(!password){
                                       next("Please provide the password")

          }

const existingUser=await user.findOne({email})
if(existingUser){
     next ( "Email already exists")}
          
const newUser=await user.create({name ,email,password})
          res.status(201).send({sucess:true,message:"User created successfully ",newUser})
} catch (error) {
       next(error)
}}

export default registerController;