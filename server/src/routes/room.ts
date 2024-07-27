import express, { Request, Response } from 'express';
import { CreateRoom, getRoomPlayers, getUserRoom } from '../controller/room.js';

const router = express.Router();

router.post('/create-room',CreateRoom)
router.get('/user-room',getUserRoom)
router.get('/players/:roomId',getRoomPlayers)

export default router;
