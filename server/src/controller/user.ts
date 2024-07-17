import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import { signUpInput } from '@adityaat2810/cine-draw'; 
import ErrorHandler from "../lib/errorHandler.js";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();

export const SECRET_KEY: Secret = process.env.SECRET_KEY as string ;

export const Signup = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    // Zod validation 
    const success = signUpInput.safeParse(req.body);
    console.log(success);
    if (!success.success) {
        return next(new ErrorHandler("Please add all fields", 400));
    }

    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email 
        }
    });

    if (user) {
        return next(new ErrorHandler("User already exists with this email", 400));
    }

    let { username, email, passwordHash, avatarUrl } = req.body;

    const salt = genSaltSync(10);
    const hash = hashSync(passwordHash, salt);

    req.body.passwordHash = hash;

    const createUser = await prisma.user.create({
        data: req.body
    });

    return res.status(200).json({
        message: createUser,
        success: true
    });
});

export const SignIn = TryCatch(
    async(req,res,next)=>{
        const {email, passwordHash}= req.body ;
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            return next(new ErrorHandler("user not exists",404))
        }

        const hash = user.passwordHash;
        const isMatch = compareSync(passwordHash,hash);

        if(!isMatch){
            return next(new ErrorHandler("Incorrect password",404))
        }

        const token = jwt.sign({ _id: user.id?.toString(), email: user.email }, SECRET_KEY, {
            expiresIn: '2 days',
        });

        return res.status(200).json({
            token:token,
            success:true
        })
    }
)
