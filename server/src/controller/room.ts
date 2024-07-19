import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../lib/errorHandler.js";
import { TryCatch } from "../middleware/error.js";

const prisma = new PrismaClient();

export const CreateRoom = TryCatch(async (req, res, next) => {
  // Zod validation
  const { name, ownerId } = req.body;
  if (!name || !ownerId) {
    return next(new ErrorHandler("Invalid input", 404));
  }
  const gameRoom = await prisma.gameRoom.create({
    data: { name, ownerId }
  });

  if (!gameRoom) {
    return next(new ErrorHandler("Failed creating game room", 500));
  }

  return res.status(200).json({
    data: gameRoom,
    success: true
  });
});

export const getUserRoom = TryCatch(async (req, res, next) => {
  const { userId } = req.query; // Changed to req.query
  console.log(req.query);
  console.log(userId);
  if (!userId) {
    return next(new ErrorHandler("User id missing ", 404));
  }

  const rooms = await prisma.gameRoom.findMany({
    where: {
      ownerId: userId as string
    }
  });

  return res.status(200).json({
    data: rooms,
    success: true
  });
});
