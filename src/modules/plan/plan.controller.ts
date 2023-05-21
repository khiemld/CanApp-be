import PlanService from './plan.service'
import CreatePlanDto from './dtos/createPlan.dto';
import { NextFunction, Request, Response } from "express";
import AddMemberDto from './dtos/addMember.dto';
import MoveColDto from './dtos/moveCol.dto';
import { isEmptyObject } from '@core/utils';
import { HttpException } from '@core/exceptions';

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

    public updatePlan = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model: CreatePlanDto = req.body;
            const userId : string = req.params.user_id;
            const planId : string = req.params.plan_id;
            let plan = await this.planService.updatePlan(userId, planId, model);
            res.status(201).json({
                error: false,
                message: 'Update Plan successfully',
                plan: plan
            })
        }
        catch(error){
            next(error);
        }
    }

    public blockPlan = async(req: Request, res: Response, next: NextFunction) =>{
        
        try{
            const userId : string = req.params.user_id;
            const planId : string = req.params.plan_id;
    
            let plan = await this.planService.blockPlan(userId, planId);
            res.status(201).json({
                error: false,
                message: 'Block plan successfully',
                plan: plan
            });
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
            const planId : string = req.params.plan_id;
            const userId : string = req.params.user_id;
            let plan = await this.planService.addMember(userId, planId, model);
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

    public findPlanById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const planId : string = req.params.plan_id;
            let plan = await this.planService.getPlanById(planId);
            res.status(201).json({
              error: false,
              message: 'Get plan successfully',
              plan: plan  
            })
        }
        catch(error){
            next(error);
        }
    }

    public moveCol = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model : MoveColDto = req.body;

            if(isEmptyObject(model)){
                throw new HttpException(409, 'Model is empty');
            }

            const indexMove : number = model.indexMove;
            const idCol : string = model.idCol;
            const idPlan : string = model.idPlan;
            let col = await this.planService.moveColumn(idCol, idPlan, indexMove);
            res.status(201).json({
                error: false,
                message: 'Move Column Successfully',
                column: col
            }) 
        }
        catch(error){
            next(error);
        }
        
    }

    public getUserPlan = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const user_id : string = req.params.user_id;
            let plan = await this.planService.getUserPlan(user_id);
            res.status(201).json({
              error: false,
              message: 'Get plan successfully',
              plan: plan  
            })
        }
        catch(error){
            next(error)
        }
    }


}