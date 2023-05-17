import { Route } from "@core/interface";
import { Router } from "express";
import querystring from "querystring";


import validationMiddleware from "@core/middleware/validation.middleware";
import TaskController from "./task.controller";



export default class TaskRoute implements Route{
    public path = '/api/v1/task';
    public router= Router();


    public taskController = new TaskController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){

        //Add task
        this.router.post(this.path + '/add/:user_id/:plan_id/:list_id', this.taskController.addTask);

        //Get task by  id
        this.router.get(this.path + '/:id_task', this.taskController.getTaskById);

        //Add member to task
        this.router.put(this.path +'/members/:user_id/:plan_id/:task_id', this.taskController.addMember);

        //Update Task
        this.router.put(this.path +'/update/:user_id/:plan_id/:task_id', this.taskController.updateTask);
    }
}