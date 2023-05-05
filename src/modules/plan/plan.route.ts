import { Route } from "@core/interface";
import { Router } from "express";
import PlanController from "./plan.controller";
import validationMiddleware from "@core/middleware/validation.middleware";
import CreatePlanDto from "./dtos/createPlan.dto";

export default class PlanRoute implements Route{
    public path = '/api/v1/plan';
    public router= Router();
    //private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public planController = new PlanController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Add user
        this.router.post(this.path + '/:id', 
            validationMiddleware(CreatePlanDto, true),
            this.planController.createPlan);

        //Get All Plans
        this.router.get(this.path, this.planController.getAllPlans);
        
        //Add Member
        this.router.put(this.path +'/members/:id', this.planController.addMember);
    }
}
