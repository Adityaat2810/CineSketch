import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../lib/errorHandler.js";
import { TryCatch } from "../middleware/error.js";

const prisma = new PrismaClient()
export const CreateRoom = TryCatch(
    async (req, res, next) => {

    // Zod validation 
    const {name ,ownerId}= req.body;
    if(!name || !ownerId){
        return next(new ErrorHandler("Invalid input", 404))
    }
    const gameRoom = await prisma.gameRoom.create({
        data:{name,ownerId}
    });

    if (!gameRoom) {
        return next(new ErrorHandler("Failed creating game room", 500));
    }


    return res.status(200).json({
        data: gameRoom,
        success: true
    });
});