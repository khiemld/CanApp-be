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

        //Add user
        this.router.post(this.path + '/add/:user_id/:plan_id/:list_id', this.taskController.addTask);
    }
}