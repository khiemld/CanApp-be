import { NextFunction, Request, Response } from "express";
import ProfileService from "./profile.service";

export default class ProfileController{
    public getProfile = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const userId = req.params.user_id;
            let profile = await new ProfileService().getProfile(userId);
            res.status(201).json({
                error: false,
                message: "Get profile successfully",
                profile: profile
            });
        }
        catch(error){
            next(error);
        }
    }
}