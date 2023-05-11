import { NextFunction, Request, Response } from "express";
import CreateTaskDto from "./dtos/addtask.dto";
import TaskService from "./task.service";



export default class TaskController{
    private listTaskService = new TaskService();

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
}