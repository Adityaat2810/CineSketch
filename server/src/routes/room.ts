import express, { Request, Response } from 'express';
import { CreateRoom, getUserRoom } from '../controller/room.js';

const router = express.Router();

router.post('/create-room',CreateRoom)
router.get('/user-room',getUserRoom)

export default router;
