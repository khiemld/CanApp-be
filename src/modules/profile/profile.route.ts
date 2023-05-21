import { Route } from "@core/interface";
import { Router } from "express";
import ProfileController from "./profile.controller";



export default class ProfileRoute implements Route{
    public path = '/api/v1/profile';
    public router= Router();
    //private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public profileController = new ProfileController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Get profile
        this.router.get(this.path + '/:user_id', this.profileController.getProfile);
    }
}