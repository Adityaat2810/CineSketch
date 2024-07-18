import express, { Request, Response } from 'express';
import { SignIn, Signup,getUserDetails } from '../controller/user.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', SignIn);
router.get('/profile',getUserDetails)


export default router;
