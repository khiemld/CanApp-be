import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { Logger } from "@core/utils";
import { HttpException } from "@core/exceptions";

const validationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body), {skipMissingProperties}).then((errors: ValidationError[])=> {
            if(errors.length > 0){
                const messages = errors.map((error: ValidationError)=>{
                    return Object.values(error.constraints!);
                }).join(",");
                next(new HttpException(400, messages));
            }
        });
    } 
}

export default validationMiddleware;