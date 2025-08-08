import user from "../models/userschema.js";
export const updateUserController=async(req,res,next)=>{
          const{name,email,lastName,location}=req.body

if(!name||!email||!lastName||!location){
          return next("Please provide all field")
          
}
const nuser=await user.findOne({_id:req.user.userId})
nuser.name=name
nuser.email=email

nuser.lastName=lastName

nuser.location=location

await nuser.save();
res.status(200).json({
  success: true,
  message: "User updated successfully",
  user: {
    name: nuser.name,
    email: nuser.email,
    lastName: nuser.lastName,
    location: nuser.location
  }
});



}