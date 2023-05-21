import CreatePlanDto from "@modules/plan/dtos/createPlan.dto";
import ListTaskService from "./listTask.service";
import { NextFunction, Request, Response } from "express";
import AddListDto from "./dtos/addList.dto";
import MoveTaskDto from "./dtos/moveTask.dto";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";


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

    public moveTask = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model : MoveTaskDto = req.body;

            if(isEmptyObject(model)){
                throw new HttpException(409, 'Model is empty');
            }

            const indexMove : number = model.indexMove;
            const fromId : string = model.fromId;
            const toId : string = model.toId;
            const taskId : string = model.idTask;
            let task = await this.listTaskService.moveTask(indexMove, taskId, fromId, toId);
            res.status(201).json({
                error: false,
                message: 'Move Task Successfully',
                task: task
            })
        }
        catch(error){
            next(error);
        }
    }
    
}