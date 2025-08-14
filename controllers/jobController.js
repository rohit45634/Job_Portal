import { compare } from "bcryptjs";
import jobs from "../models/jobModel.js";
import mongoose from "mongoose";
import moment from "moment";

//=============CREATE JOB=======================
export const createJobController=async(req,res,next)=>{
          const {company,position}=req.body

          if(!company||!position){
                    return next("please provide all field")
          }

req.body.createdBy=req.user.userId
const job=await jobs.create(req.body)
res.status(201).json({job})}


//=============GET JOB=======================
export const getAllJobController=async(req,res,next)=>{
const {status,search,sort}=req.query

//condition for serching Job
const queryObject={
       createdBy:req.user.userId
}
//logic filter
if(status&&status!=='all'){
       queryObject.status=status
}
if(search){
       queryObject.position={$regex:search ,$options:'i'}
}
let queryResult=jobs.find(queryObject)

//sort
if(sort==='latest'){
       queryResult=queryResult.sort('-createdAt')
}
if(sort==='oldest'){
       queryResult=queryResult.sort('createdAt')
}
if(sort==='a-z'){
       queryResult=queryResult.sort('position')
}
if(sort==='z-a'){
       queryResult=queryResult.sort('-position')
}

//pagination 
const page =Number(req.query.page)||1
const limit =Number(req.query.limit)||10
const skip=(page-1)*limit

queryResult=queryResult.skip(skip).limit(limit)

//job count
const totaljobs=await jobs.countDocuments(queryResult)
const numOfPage=Math.ceil(totaljobs/limit)
const job_=await queryResult

       res.status(200).json({
                    totaljobs,
                    job_,
                    numOfPage
          })

}


//=============UPDATE JOB=======================

export const updateJobController=async(req,res,next)=>{
const {id}=req.params
const {company,position}=req.body

//validation
if(!company||!position){
       return   next("please provide all field")
}

//find job 
const job =await jobs.findOne({_id:id})
if(!job){
       return   next(`no job found with id ${id}`)
}
//check userId and job same then Update query run 
if(req.user.userId!== job.createdBy.toString()){
         return next("you not authorize update this job")
}
const updatejob=await jobs.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
res.status(200).json({
          updatejob
})

}
//=============DELETE JOB=======================

export  const deleteJobController=async(req,res,next)=>{
          const {id}=req.params
//find Job
const job=await jobs.findOne({_id:id})

//validation 
if(!job){
          return next(`no Job Found This ID ${id}`)
}
if(!req.user.userId===job.createdBy.toString()){
          return next("YOU NOT authorize to delete this Job")
}
await job.deleteOne()

res.status(200).json({
          message:"Success Job deleted"
})
}

//=============State-Filter JOB=======================

export  const jobStatesController=async(req,res)=>{

       const stats=await jobs.aggregate([
              //search by user job
              {
                     $match:{
                            createdBy:new mongoose.Types.ObjectId(req.user.userId)
                     }
              },
              {$group:{
              _id:"$workType",
              count:{$sum:1}
                     }
              }
       ]);

//default states 
 const defaultStats={
              pending:stats.pending||0,
              interview:stats.pending||0,
              reject:stats.pending||0,

       }

//Monthly and Yearly stats
       let monthYearsStats= await jobs.aggregate([
              {$match:{
              createdBy:new mongoose.Types.ObjectId(req.user.userId)
                     }
              },{
                     $group:{
                           _id:{Month:{$month:"$createdAt"},
                           Year:{$year:"$createdAt"}
                     },
 count:{$sum:1}
                     }
              }
       ])
       
   monthYearsStats=monthYearsStats.map(item=>{
       const{_id:{Year,Month},count}=item
       const date =moment().month(Month-1).year(Year).format("MMM Y")
       return {date,count}

   })

   .reverse()
   console.log(typeof moment); // should print "function"

res.status(200).json({totaljob:stats.length,stats,monthYearsStats})
}
