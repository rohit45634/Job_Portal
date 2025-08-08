import express from "express";
import testcontroller from "../controllers/test.js";
import userAuth from "../middlewares/authMiddleware.js";

const router=express.Router()

router.post('/test',userAuth,testcontroller)

export default router;