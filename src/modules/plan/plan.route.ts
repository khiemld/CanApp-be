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
        //Add Plan
        this.router.post(this.path + '/:id', 
            validationMiddleware(CreatePlanDto, true),
            this.planController.createPlan);

        //Block Plan
        this.router.put(this.path + '/:user_id/:plan_id',
            this.planController.blockPlan);

        //Update Plan
        this.router.put(this.path + '/update/:user_id/:plan_id', this.planController.updatePlan),

        //Get All Plans
        this.router.get(this.path, this.planController.getAllPlans);

        //Get Plan By Id
        this.router.get(this.path + '/:plan_id', this.planController.findPlanById)
        
        //Add Member
        this.router.put(this.path +'/members/:user_id/:plan_id', this.planController.addMember);

        //Move Col
        this.router.put(this.path + 'move', this.planController.moveCol);

        //Get user plan
        this.router.get(this.path + '/user-plan/:user_id', this.planController.getUserPlan);
    }
}
