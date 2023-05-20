import { Route } from "@core/interface";
import { Router } from "express";
import RateController from "./rate.controller";


export default class RateRoute implements Route{
    public path = '/api/v1/rate';
    public router= Router();
    //private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public rateController = new RateController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Add Plan
        this.router.post(this.path + '/create/:member_id/:judge_id',
            this.rateController.createRate);
    }
}
