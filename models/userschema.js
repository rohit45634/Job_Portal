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
          email:{
                    type:String,
                    required:true,
                    unique:true,
                    validate:[validator.isEmail,"please enter valid Email"],
                
        validator: function (email) {
          const parts = email.split("@");
          if (parts.length !== 2) return false;

          const domain = parts[1];

          // Check if domain ends with a valid TLD
          return allowedTLDs.some(tld => domain.endsWith(tld));
        },
        message: "Email domain must end with a valid extension like .com or .in",
      
      
        validator: function (email) {
          const domain = email.split("@")[1];
          return allowedDomains.includes(domain); // strict: only allow real domains
        },
        message: "Only common email domains like gmail.com are allowed",
      
},

password:{
                    type:String,
                    required:true,
                    minlength:[6,"password shuld be grater then 6"],
          },
          location:{
                    type:String,
                    default:"Mumbai",
          }
},
{timestamps:true} )
//Hasing password
userSchmea.pre('save',async function(){
    if (!this.isModified("password")) return next();

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