import { HttpException } from "@core/exceptions";
import TaskSchema from "./task.model"
import CreateTaskDto from "./dtos/addtask.dto";
import ITask, { IMember } from "./task.interface";
import { isEmptyObject } from "@core/utils";
import { PlanSchema } from "@modules/plan";
import { UserSchema } from "@modules/users";
import { ListTaskSchema } from "@modules/listTask";
import AddMemberDto from "@modules/plan/dtos/addMember.dto";
import mongoose from "mongoose";
import UpdateTaskDto from "./dtos/update.dto";


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

        list.tasks.push({taskId : newTask._id});
        
        await list.save();

        return newTask;
    }

    public async getTaskById(idTask: string) : Promise<ITask>{
        const task = await this.taskSchema.findById(idTask).exec();

        if(!task){
            throw new HttpException(404, `Task is not exits`)
        }

        return task;
    }

    public async addMember(idLead: string, idTask: string, idPlan: string,  model:AddMemberDto) : Promise<ITask>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }
        
        const plan = await this.planSchema.findById(idPlan).exec();
        const task = await this.taskSchema.findById(idTask).exec();
        const user = await this.userSchema.findOne({email: model.email}).exec();
        
        if(!task){
            throw new HttpException(409, 'Invalid id task');
        }

        if(!plan){
            throw new HttpException(409, 'Invalid id plan');
        }

        if(!user){
            throw new HttpException(409, 'Invalid member')
        }

        if(plan.manager != idLead){
            throw new HttpException(400, 'You are not allowed to add member');
        }

        if(!user){
            throw new HttpException(409, 'User is not found');
        }

        task.members.push(user._id);

        return await task.save();
    }

    public async updateTask(idTask: string, idLead: string, idPlan: string, model: UpdateTaskDto) : Promise<ITask>{
        const plan = await  this.planSchema.findById(idPlan).exec();

        if(!plan){
            throw new HttpException(409, 'Invalid Id Plan');
        }

        // if(plan.manager !== new mongoose.Types.ObjectId(idLead.toString()).toString()){
        //     throw new HttpException(409, 'You are not allow to update task');
        // }

        const newTask = await this.taskSchema.findByIdAndUpdate(
            idTask,
            {
                description: model.description,
                beginTime: model.beginTime,
                endTime: model.endTime
            },
            {new: true}
        ).exec();

        if(!newTask){
            throw new HttpException(409, 'Task not found');
        }

        return await newTask.save();
    }

    

}

export default TaskService;