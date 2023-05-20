import { NextFunction, Request, Response } from "express";
import CreateTaskDto from "./dtos/addtask.dto";
import TaskService from "./task.service";
import { isEmptyObject } from "@core/utils";
import AddMemberDto from "@modules/plan/dtos/addMember.dto";
import { HttpException } from "@core/exceptions";
import { IPlan, PlanSchema } from "@modules/plan";
import { UserSchema } from "@modules/users";
import { CustomAggregationExpressionOperatorReturningAny } from "mongoose";
import UpdateTaskDto from "./dtos/update.dto";



export default class TaskController{
    private listTaskService = new TaskService();
    private planSchema = PlanSchema;
    private userSchema = UserSchema;

    public addTask = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const model : CreateTaskDto = req.body;
            const userId : string = req.params.user_id;
            const planId : string = req.params.plan_id;
            const listId : string= req.params.list_id;
            let task = await this.listTaskService.createTask(listId, userId, planId, model);
            res.status(201).json({
                error: false,
                message: 'Add Task Successfully',
                task: task
            })
        }
        catch(error){
            next(error);
        }
    }

    public getTaskById = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const taskId : string = req.params.id_task;
            let task = await this.listTaskService.getTaskById(taskId);
            res.status(201).json({
                error: false,
                message: 'Get Task Successfully',
                task: task
            })
        }   
        catch(error){
            next(error);
        }
    }

    public addMember = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model : AddMemberDto = req.body;
            const planId : string = req.params.plan_id;
            const userId : string = req.params.user_id;
            const taskId : string = req.params.task_id;
            let task = await this.listTaskService.addMember(userId, taskId, planId, model);
            res.status(201).json({
                error: false,
                message: 'Add Member Successfully',
                task: task
            })
        }
        catch(error){
            next(error);
        }
    }

    public updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model : UpdateTaskDto = req.body;
            const planId : string = req.params.plan_id;
            const userId : string = req.params.user_id;
            const taskId : string = req.params.task_id;
            let task = await this.listTaskService.updateTask(taskId, userId, planId, model);
            res.status(201).json({
                error: false,
                message: 'Add Member Successfully',
                task: task
            })
        }
        catch(error){
            next(error);
        }
    }

    public blockTask = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const userId : string = req.params.user_id;
            const planId : string = req.params.plan_id;
            const taskId : string = req.params.task_id;
            let task = await this.listTaskService.blockTask(userId, planId, taskId);
            res.status(201).json({
                error: false,
                message: 'Block Task Successfully',
                task: task
            })
        }
        catch(error){
            next(error);
        }
    }

}