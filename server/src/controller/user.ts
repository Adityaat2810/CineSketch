import { Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import {z} from 'zod'
export const Signup =TryCatch(
    async(req,res,next)=>{
        const {
            username , email , passwordHash,
            avatarUrl
        } = req.body

        return(
            res.status(200).json({
                
            })
        )
    }
)