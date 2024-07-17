import express, { Request, Response } from 'express';
import { SignIn, Signup } from '../controller/user.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', SignIn);


export default router;
