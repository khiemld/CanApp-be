import CreatePlanDto from "@modules/plan/dtos/createPlan.dto";
import ListTaskService from "./listTask.service";
import { NextFunction, Request, Response } from "express";
import AddListDto from "./dtos/addList.dto";


export default class ListTaskController{
    private listTaskService = new ListTaskService();

    public addList = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model : AddListDto = req.body;
            const userId : string = req.params.user_id;
            const planId : string = req.params.plan_id;
            let listTask = await this.listTaskService.addList(planId, userId, model);
            res.status(201).json({
                error: false,
                message: 'Add Task Successfully',
                list: listTask
            })
        }
        catch(error){
            next(error);
        }
    }
}