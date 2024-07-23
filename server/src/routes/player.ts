import express, { Request, Response } from 'express';
import { verifyPlayer, createPlayer } from '../controller/player.js';

const router = express.Router();
router.post('/',createPlayer)
router.post('/verify',verifyPlayer)


export default router;
