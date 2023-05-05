import PlanService from './plan.service'
import CreatePlanDto from './dtos/createPlan.dto';
import { NextFunction, Request, Response } from "express";
import AddMemberDto from './dtos/addMember.dto';

export default class PlanController{

    private planService = new PlanService();


    public createPlan = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model : CreatePlanDto = req.body;
            const userId : string = req.params.id;
            let plan = await this.planService.createPlan(userId, model);
            res.status(201).json({
                error: false,
                message: 'Create Plan successfully',
                plan: plan
            })
        }
        catch(error){
            next(error);
        }

    }

    public getAllPlans = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const plans = await this.planService.getAllPlans();
            res.status(200).json(plans);
        }
        catch(error){
            next(error);
        }
    };

    public addMember = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model : AddMemberDto = req.body;
            const planId : string = req.params.id;
            let plan = await this.planService.addMember(planId, model);
            res.status(201).json({
                error: false,
                message: 'Add Member Successfully',
                plan: plan
            })
        }
        catch(error){
            next(error);
        }
    }

}