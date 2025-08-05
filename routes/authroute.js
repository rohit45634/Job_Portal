import express from "express";
import {registerController,loginController} from "../controllers/authControlle.js";

const router =express.Router()

//REGISTER||POST
router.post('/register',registerController)

//LOGIN||POST
router.post('/login',loginController)



export default router;