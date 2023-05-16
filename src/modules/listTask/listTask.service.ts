import { isEmptyObject } from '@core/utils';
import AddListDto from './dtos/addList.dto';
import IListTask, { IItem } from './listTask.interface';
import ListTaskSchema from './listTask.model'
import { HttpException } from '@core/exceptions';
import { PlanSchema } from '@modules/plan';
import { UserSchema } from '@modules/users';
import { IList, IMember } from '@modules/plan/plan.interface';

import mongoose, { Query } from 'mongoose'
import { ITask, TaskSchema } from '@modules/task';
import { Http } from 'winston/lib/winston/transports';

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
        delete newList.__v;
        plan.list.push(newList._id);
        
        await plan.save();
        
        return newList;
    }

    public async moveTask(indexMove: number, idTask: string, idFromCol: string, idToCol: string) : Promise<ITask>{
        const fromCol = await this.listTaskSchema.findById(idFromCol).exec();
        const toCol = await this.listTaskSchema.findById(idToCol).exec();
        const task = await this.taskSchema.findById(idTask).exec();

       

        if(!task){
            throw new HttpException(409, 'Invalid id task');
        }

        if(!fromCol){
            throw new HttpException(409, 'Invalid Id Start Column');
        }

        if(!toCol){
            throw new HttpException(409, "Invalid Id Destination Column");
        }

 
        //Chuyen khac cot
        if(idFromCol !== idToCol){
            const idUpdate = new mongoose.Types.ObjectId(idTask);
            const indexTask = this.findIndexByObject(fromCol.tasks, idUpdate);
            

            await this.listTaskSchema.findByIdAndUpdate(
                idFromCol,
                {tasks: fromCol.tasks.splice(indexTask, 1)},
                {new: true}
            ).exec();
          
            
            const newTask = new TaskSchema(
                {title: task.title,
                 plan: task.plan,
                 column: idToCol
                }
            );

            newTask.save();
            
            if(!newTask){
                throw new HttpException(409, 'New Task not found')
            }
            
            await this.taskSchema.findByIdAndDelete(idTask).exec();

            toCol.tasks.splice(indexMove, 0, {taskId: newTask._id.toHexString()});
            toCol.save();
           
            const arrayLengthToCol : number = toCol.tasks.length;
            for(var i = 0; i < arrayLengthToCol; i++){
                await this.taskSchema.findByIdAndUpdate(
                    toCol.tasks[i].taskId,
                    {index: i,},
                    {new: true}
                ).exec();
            }

            const arrayLengthFromCol : number = fromCol.tasks.length;
            for(var i = 0; i < arrayLengthFromCol; i++){
                await this.taskSchema.findByIdAndUpdate(
                    fromCol.tasks[i].taskId,
                    {index: i,},
                    {new: true}
                ).exec();
            }

            return newTask;

        }
        else{
            const idUpdate = new mongoose.Types.ObjectId(idTask);
            
            const indexTask = this.findIndexByObject(fromCol.tasks, idUpdate);

            await this.listTaskSchema.findByIdAndUpdate(
                idFromCol,
                {tasks: fromCol.tasks.splice(indexTask, 1)},
                {new: true}
            ).exec();

            const newTask = new TaskSchema(
                {title: task.title,
                 plan: task.plan,
                 column: idFromCol
                }
            );

            newTask.save();
            
            if(!newTask){
                throw new HttpException(409, 'New Task not found')
            }
            
            await this.taskSchema.findByIdAndDelete(idTask).exec();

            fromCol.tasks.splice(indexMove, 0, {taskId: newTask._id.toHexString()});
            
            fromCol.save();

            const arrayLength : number = fromCol.tasks.length;
            for(var i = 0; i < arrayLength; i++){
                await this.taskSchema.findByIdAndUpdate(
                    fromCol.tasks[i].taskId,
                    {index: i,},
                    {new: true}
                ).exec();
            }
     
            return newTask;

        }
        
    }

    private  findIndexByObject(array: IItem[], searchObject: Object) {
        for (var i = 0; i < array.length; i++) {
          var currentObject = array[i];
          console.log('currentObject: '+ currentObject);
          console.log('object: ' + searchObject);
          if (this.compareObjects(currentObject, new mongoose.Types.ObjectId(searchObject.toString()))) {
            return i;
          }
        }
        return -1;
      }
      
    private  compareObjects(object1 : Object, object2 : Object) {
        // Kiểm tra các thuộc tính của đối tượng để so sánh
        
        const flag : String = object1.toString();

        return flag.includes(object2.toString());
    }
      
     
}


export default ListTaskService;