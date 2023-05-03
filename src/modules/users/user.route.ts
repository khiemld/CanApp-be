import { Route } from "@core/interface";
import { Router } from "express";
import UsersController from "./user.controller";
import bodyParser from "body-parser";
import validationMiddleware from "@core/middleware/validation.middleware";
import RegisterDto from "./dtos/register.dto";


export default class UserRoute implements Route{
    public path = '/api/users';
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
    }
}