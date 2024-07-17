import ErrorHandler from "../lib/errorHandler";
import express, { NextFunction, Request, Response } from "express"
import { ControllerType } from "../types/types";

export const errorMiddleware=(
    err:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    err.message ||="Internal server error";
    err.statusCode ||=  500;

    if(err.name ==="CastError") err.message="Invalid id"

    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}

// wrapper type 

export const TryCatch = (func:ControllerType)=>{
    (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch(next);
}
}