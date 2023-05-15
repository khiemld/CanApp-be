import { HttpException } from "@core/exceptions";
import TaskSchema from "./task.model"
import CreateTaskDto from "./dtos/addtask.dto";
import ITask from "./task.interface";
import { isEmptyObject } from "@core/utils";
import { PlanSchema } from "@modules/plan";
import { UserSchema } from "@modules/users";
import { ListTaskSchema } from "@modules/listTask";


class TaskService{
    public taskSchema = TaskSchema;
    public planSchema = PlanSchema;
    public userSchema = UserSchema;
    public listSchema = ListTaskSchema;

    public async createTask(idList: string, idLead: string, idPlan: string, model: CreateTaskDto) : Promise<ITask>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const plan = await this.planSchema.findById(idPlan).exec();
        const list = await this.listSchema.findById(idList).exec();

        if(!plan){
            throw new HttpException(400, 'Id Plan is invalid')
        }

        if(!list){
            throw new HttpException(400, 'Id List is invalid');
        }

        if(plan.manager != idLead){
            throw new HttpException(403, 'You are not allowed to create task');
        }

        const newTask = new TaskSchema(
            {title: model.title,
             plan: idPlan,
             column: idList,
             index: list.tasks.length
            }
        );

        await newTask.save();

        list.tasks.unshift(newTask._id);
        
        await list.save();

        return newTask;
    }

}

export default TaskService;