import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobController, updateJobController,jobStatesController } from "../controllers/jobController.js";

//mini router object
const router=express.Router()

//Create Job||POST
router.post ('/create-job',userAuth,createJobController)

//GET job||GET
router.get('/get-job',userAuth,getAllJobController) 

//UPDATE JOB||PATCH
router.patch('/update-job/:id',userAuth,updateJobController) 

//DELETE JOB||DELETE
router.delete('/delete-job/:id',userAuth,deleteJobController) 


//State Filter JOB||GET
router.get('/job-states',userAuth,jobStatesController) 

export default router;