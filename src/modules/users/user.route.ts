import { Route } from "@core/interface";
import { Router } from "express";
import UsersController from "./user.controller";
import bodyParser from "body-parser";
import validationMiddleware from "@core/middleware/validation.middleware";
import RegisterDto from "./dtos/register.dto";


export default class UserRoute implements Route{
    public path = '/api/users';
    public router= Router();
    private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public usersController = new UsersController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        this.router.post(this.path, 
            //validationMiddleware(RegisterDto, true),
            this.usersController.register);
    }
}