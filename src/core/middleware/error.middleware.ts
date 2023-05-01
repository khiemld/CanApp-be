import { HttpException } from "@core/exceptions";
import { Logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";
import { error } from "winston";

 const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong..."

    Logger.error(`[ERROR] - Status: ${status} - Msg: ${message}`);
    res.status(status).json({message: message})
 };

 export default errorMiddleware;