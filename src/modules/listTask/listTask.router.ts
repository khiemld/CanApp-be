import { Route } from "@core/interface";
import { Router } from "express";

import validationMiddleware from "@core/middleware/validation.middleware";
import ListTaskController from "./listTask.controller";


export default class ListRoute implements Route{
    public path = '/api/v1/list';
    public router= Router();


    public listTaskController = new ListTaskController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Add list
        this.router.post(this.path + '/add/:user_id/:plan_id', this.listTaskController.addList);

        //Move task
        this.router.put(this.path + '/move', this.listTaskController.moveTask);
    }
}
