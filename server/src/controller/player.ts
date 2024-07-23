import { PrismaClient } from "@prisma/client";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../lib/errorHandler.js";

const prisma = new PrismaClient()

export const createPlayer = TryCatch(
    async (req, res, next) => {
      const { userId, gameRoomId } = req.body;
  
      // Validate input
      if (!userId || !gameRoomId) {
        return next(new ErrorHandler('bad request',404))
      }
  

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
  
        // Check if the game room exists
        const gameRoom = await prisma.gameRoom.findUnique({
          where: { id: gameRoomId },
        });
  
        if (!gameRoom || !gameRoom) {
            return next(new ErrorHandler("invalid data",404))
        }
  
        const existingPlayer = await prisma.player.findUnique({
          where: {
            userId_gameRoomId: {
              userId,
              gameRoomId,
            },
          },
        });
  
        if (existingPlayer) {
          return res.status(200).json({
             success: true, 
             data:existingPlayer 
            });
        }
  
    
        const player = await prisma.player.create({
          data: {
            userId,
            gameRoomId,
          },
        });
  
        return res.status(201).json({ 
            success: true,
            data: player });
    
    }
  );