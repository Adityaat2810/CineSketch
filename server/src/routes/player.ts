import express, { Request, Response } from 'express';
import { createPlayer } from '../controller/player.js';

const router = express.Router();
router.post('/',createPlayer)

export default router;
