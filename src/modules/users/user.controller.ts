import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import UserService from "./user.service";
import { TokenData } from "@modules/auth";
import { Logger } from "@core/utils";

export default class UsersController{
    private userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : RegisterDto = req.body;
            const tokenData : TokenData= await this.userService.createUser(model);
            // res.status(201).json({
            //     error: false,
            //     result: "Register successfully"
            // });
            res.status(201).json(tokenData);
        }
        catch(error){
            // res.status(409).json({
            //     error: true,
            //     result: "Register failed",
            //     detail: `Your email already existed`
            // });
            // Logger.error(error);
            next(error);
        }
    };
}