import express, { NextFunction, Request, Response } from "express"
import ErrorHandler from "../lib/errorHandler.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware =(
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

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};