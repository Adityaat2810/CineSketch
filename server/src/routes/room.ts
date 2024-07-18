import express, { Request, Response } from 'express';
import { CreateRoom } from '../controller/room.js';

const router = express.Router();

router.post('/create-room',CreateRoom)


export default router;
