import { Route } from "@core/interface";
import { Router } from "express";
import UsersController from "./user.controller";
import bodyParser from "body-parser";
import validationMiddleware from "@core/middleware/validation.middleware";
import RegisterDto from "./dtos/register.dto";
import multer from "multer";
import { getAnalytics } from "firebase/analytics";
import firebase, { initializeApp } from 'firebase/app';
export default class UserRoute implements Route{
    public path = '/api/v1/users';
    public router= Router();
    //private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public usersController = new UsersController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Add user
        this.router.post(this.path, 
            validationMiddleware(RegisterDto, true),
            this.usersController.register);
        
        //Update user
        this.router.put(this.path + '/:id', 
                validationMiddleware(RegisterDto, true),
                this.usersController.updateUser);

        //Get user
        this.router.get(this.path + '/:id', this.usersController.getUserById);

        //Get all user
        this.router.get(this.path, this.usersController.getAllUser);

        //UploadImage
        // const firebaseConfig = {
        //     apiKey: "AIzaSyB_Dqq8XRa69jkevbZNib8DLc7GQHf4y_I",
        //     authDomain: "can-app-image.firebaseapp.com",
        //     projectId: "can-app-image",
        //     storageBucket: "can-app-image.appspot.com",
        //     messagingSenderId: "597912193353",
        //     appId: "1:597912193353:web:86a0a32c9cfbace836f298",
        //     measurementId: "G-TRVMMMCL3Z"
        // };
          
        //   // Initialize Firebase
        // initializeApp(firebaseConfig);
        const upload = multer({ storage: multer.memoryStorage() });
        this.router.post(this.path + '/upload/:user_id', upload.single("avatar"),  this.usersController.uploadImage);
    }
}