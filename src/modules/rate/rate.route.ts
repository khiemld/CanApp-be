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
        //Add Rate
        this.router.post(this.path + '/add', this.rateController.createRate);

        //Get all rate
        this.router.get(this.path, this.rateController.getAllRates);

        //Get rate by plan id
        this.router.get(this.path + '/:plan_id', this.rateController.getRatesByPlanId);
    }
}
