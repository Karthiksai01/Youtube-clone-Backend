import express from 'express';
import {signUp,signIn, logout} from "../controllers/authController.js";
 
const router=express.Router();
router.post('/signup',signUp);
router.post('/login',signIn);
router.post('/logout',logout)

export default router;