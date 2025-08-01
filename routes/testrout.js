import express from "express";
import testcontroller from "../controllers/test.js";

const router=express.Router()

router.post('/test',testcontroller)

export default router;