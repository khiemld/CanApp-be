import { isEmptyObject } from '@core/utils';
import AddListDto from './dtos/addList.dto';
import IListTask from './listTask.interface';
import ListTaskSchema from './listTask.model'
import { HttpException } from '@core/exceptions';
import { PlanSchema } from '@modules/plan';
import { UserSchema } from '@modules/users';
import { IList, IMember } from '@modules/plan/plan.interface';

import mongoose, { Query } from 'mongoose'
import { ITask, TaskSchema } from '@modules/task';

class ListTaskService{
    public listTaskSchema = ListTaskSchema;
    public planSchema = PlanSchema;
    public userSchema = UserSchema;
    public taskSchema = TaskSchema;

    public async addList(idPlan: string, idLead: string, model: AddListDto) : Promise<IListTask>{
        
        if(isEmptyObject(model))
            throw new HttpException(400, 'Model is empty');

        const plan = await this.planSchema.findById(idPlan).exec();

        if(!plan){
            throw new  HttpException(400, 'Id Plan is not exist');
        }


        if(plan.manager != idLead){
            throw new HttpException(403, 'You are not allowed to add list');
        }
        

        const newList = new ListTaskSchema(
            {name: model.name,
            plan: idPlan,
            index: plan.list.length},
        );
         
        await newList.save();
        plan.list.push(newList._id);
        
        await plan.save();
        
        return newList;
    }

    public async moveTask(indexMove: number, idTask: string, idFromCol: string, idToCol: string) : Promise<ITask>{
        const fromCol = await this.listTaskSchema.findById(idFromCol).exec();
        const toCol = await this.listTaskSchema.findById(idToCol).exec();
        

        if(!fromCol){
            throw new HttpException(409, 'Invalid Id Start Column');
        }

        if(!toCol){
            throw new HttpException(409, "Invalid Id Destination Column");
        }

        const listCardFromCol = fromCol.tasks.filter((column: any) => 
            column.toString() !== new mongoose.Types.ObjectId(idTask)
        );
        console.log(listCardFromCol);

        let updatedFromCol = await this.listTaskSchema.findByIdAndUpdate(
            idFromCol, 
            {tasks: listCardFromCol},
            {new: true}
        ).exec();

        if(!updatedFromCol){
            throw new HttpException(404, 'Column not found');
        }

        //Chuyen khac cot
        if(idFromCol !== idToCol){
            const listCardToCol = toCol.tasks.splice(indexMove, 0, {taskId: idTask});

            const updatedToCol = await this.listTaskSchema.findByIdAndUpdate(
                idToCol,
                {tasks: listCardToCol},
                {new: true}
            ).exec();

            if(!updatedToCol){
                throw new HttpException(404, 'Column not found');
            }

            const updatedTask = await this.taskSchema.findByIdAndUpdate(
                idTask,
                {column: idToCol},
                {new: true}
            ).exec();
            
            if(!updatedTask){
                throw new HttpException(404, 'Can not move task');
            }

            return updatedTask;

        }
        else{ //Chuyen cung cot

           const listTaskUpdate =  fromCol.tasks.splice(indexMove, 0, {taskId: idTask});

            updatedFromCol = await this.listTaskSchema.findByIdAndUpdate(
                idFromCol, 
                {tasks: listTaskUpdate},
                {new: true}
            ).exec();
            
            

            if(!updatedFromCol){
                throw new HttpException(404, 'Can not move task');
            }

            updatedFromCol.save();

            const task = await this.taskSchema.findById(idTask).exec();

            if(!task){
                throw new HttpException(404, 'Task not found');
            }
            return task;
        }
    }

}



export default ListTaskService;