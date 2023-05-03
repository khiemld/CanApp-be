import { NextFunction, Request, Response } from "express";

import { TokenData } from "@modules/auth";
import AuthService from "./auth.service";
import LoginDto from "./auth.dto";
import { IUser } from "@modules/users";

export default class AuthController{
    private authService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : LoginDto = req.body;
            const user= await this.authService.login(model);
           
            res.status(201).json({
                error: false,
                message: "Login successfully",
                user: user
            });
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

    public getCurrentLoginUser = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const userId= req.user.id;
            const user: IUser= await this.authService.getCurrentLoginUser(userId);
            res.status(201).json(user);
        }
        catch(error){
            next(error);
        }
    };
}