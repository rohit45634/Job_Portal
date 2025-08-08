import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


// Optional: List of trusted domains (expand this as needed)
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "protonmail.com"];

// List of valid extensions
const allowedTLDs = [".com", ".in", ".org", ".net", ".co", ".gov", ".edu"];

const userSchmea=mongoose.Schema({
          name :{
                    type:String,
                    required:true
          },
          lastname:{
                    type:String
          },
          email: {
  type: String,
  required: true,
  unique: true,
  validate: [
    {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: "Please enter a valid Email",
    },
    {
      validator: function (email) {
        const parts = email.split("@");
        if (parts.length !== 2) return false;
        const domain = parts[1];
        return allowedTLDs.some((tld) => domain.endsWith(tld));
      },
      message: "Email must end with .com, .in, etc.",
    },
    {
      validator: function (email) {
        const domain = email.split("@")[1];
        return allowedDomains.includes(domain);
      },
      message: "Only common domains like gmail.com are allowed",
    },
  ],
}
,
password:{
                    type:String,
                    required:true,
                    minlength:[6,"password shuld be grater then 6"],
                        select: false, // ✅ Correct usage

          },
          location:{
                    type:String,
                    default:"Mumbai",
          },
},
{timestamps:true} )
//Hasing password
userSchmea.pre('save',async function(){
    if (!this.isModified("password")) return ;

  const salt =await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

//Cmpare Password 
userSchmea.methods.comparePassword=async function(userPassword){
  const isMatch=await bcrypt.compare(userPassword,this.password)
  return isMatch;
}
//JWT token
userSchmea.methods.createJWT=function(){
  return jwt.sign({userId:this._id},process.env.JWT_SECRET)
} 
const user=mongoose.model("User",userSchmea)

export default user;