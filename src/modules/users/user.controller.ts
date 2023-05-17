import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import UserService from "./user.service";
import { TokenData } from "@modules/auth";
import { Logger } from "@core/utils";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import { HttpException } from "@core/exceptions";
import ResetPassDto from "./dtos/resetpassword.dto";

export default class UsersController{
    private userService = new UserService();
    
    public register = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : RegisterDto = req.body;
            const tokenData : TokenData= await this.userService.createUser(model);
            res.status(201).json({
                error: false,
                result: "Register successfully"
            });
            //res.status(201).json(tokenData);
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

    public getUserById = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const userId : string = req.params.id;
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user);
        }
        catch(error){
            next(error);
        }
    };

    public getAllUser = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const users = await this.userService.getAllUser();
            res.status(200).json(users);
        }
        catch(error){
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : RegisterDto = req.body;
            const userId : string = req.params.id;
            const user = await this.userService.updateUser(userId, model);
            res.status(200).json({
                error: false,
                message: "Update successfully",
                user: user
            });
        }
        catch(error){
            next(error);
        }
    };

    public uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const storage = getStorage();
            
            if(!req.file){
                throw new HttpException(400, 'File not found')
            }

            const storageRef = ref(storage, `files/${req.file.originalname}`);
    
            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };
    
            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
    
            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            const userId = req.params.user_id;
        
            let user = await this.userService.uploadImage(userId, downloadURL);
            res.status(200).json({
                error: false,
                message: "Upload successfully",
                user: user
            });
        } catch (error) {
           next(error)
        }
    }

    public resetPassword = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model : ResetPassDto = req.body;
            const userId = req.params.user_id;
            let user = await this.userService.resetPassword(userId, model);
            res.status(201).json({
                error: false,
                message: "Reset password successfully",
                user: user
            })
        }
        catch(error){
            next(error);
        }
    }
}