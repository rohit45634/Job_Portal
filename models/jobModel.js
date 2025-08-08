import express from "express";
import mongoose from "mongoose";

const jobSchema=new Mongoose.Schema({
company:{
          type:String,
          required:[true,'Company name is required']
},
postion :{
          type:String,
          required:[true,'job position is rquired'],
          minlength:100
},
status:{
          type:String,
          enum:['pending','reject','interview'],
          default:'pending'
},
workType:{
          type:String,
          enum:['full-time','part-time','intership'],
          default:'full-time'
}
,
workLocation:{
          type:String,
          default:'mumbai',
          required:[true,'Work location is required']
},
createdBy:{
          type:mongoose.Types.ObjectId,
          ref:'User'

}

},{timestamps:true}

)

const job=mongoose.Model('job',jobSchema)

export default job;
