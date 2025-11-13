import { Response, Request, NextFunction } from "express";
import { HttpStatus } from "./HttpStatus";
import { CustomError } from "./CustomError";

export function ErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Error", err.message || err)
   
    if(err instanceof CustomError){
        return res.status(err.status).json({
            success : false, 
            message : err.message
        })
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success : false, 
        message : "Internal Server Error"
    })
}