import { HttpException } from "@core/exceptions";
import TaskSchema from "./task.model"
import CreateTaskDto from "./dtos/addtask.dto";
import ITask from "./task.interface";
import { isEmptyObject } from "@core/utils";


class AuthService{
    public taskSchema = TaskSchema;

   


}


export default AuthService;