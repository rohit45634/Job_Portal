import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController } from "../controllers/jobController.js";

//mini router object
const router=express.Router()

//Create Job||POST
router.post ('/create-job',userAuth,createJobController)

export default router;