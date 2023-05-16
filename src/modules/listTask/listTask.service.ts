import { isEmptyObject } from '@core/utils';
import AddListDto from './dtos/addList.dto';
import IListTask, { IItem } from './listTask.interface';
import ListTaskSchema from './listTask.model'
import { HttpException } from '@core/exceptions';
import { PlanSchema } from '@modules/plan';
import { UserSchema } from '@modules/users';
import mongoose from 'mongoose'
import { ITask, TaskSchema } from '@modules/task';
import { str } from 'envalid';

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

        if(!fromCol){
            throw new HttpException(409, 'Invalid Id Start Column');
        }

        if(!toCol){
            throw new HttpException(409, "Invalid Id Destination Column");
        }

        if(!task){
            throw new HttpException(409, 'Invalid id task');
        }

        //Chuyen khac cot
        if(idFromCol !== idToCol){
            
            //Tìm index của card cần move
            const idUpdate = new mongoose.Types.ObjectId(idTask);
            const indexTask = this.findIndexByObject(fromCol.tasks, idUpdate);
            console.log(indexTask);
            
            const result =  fromCol.tasks.filter((item: IItem) => !item.taskId.toString().includes(idUpdate.toHexString()));
            console.log('IdUpdate: ' + idUpdate);
            console.log('Result: ' + result);

            if(result.length > 0){
                //const objectIdArray = result.map((str : IItem) => new mongoose.Types.ObjectId(str.toString()));
                await this.listTaskSchema.findByIdAndUpdate(
                idFromCol,
                {tasks: result},
                {new: true}
                ).exec();
            }
            else{
                await this.listTaskSchema.findByIdAndUpdate(
                    idFromCol,
                    {tasks: []},
                    {new: true}
                 ).exec();
            }
            
          

            console.log("length column " + await this.listTaskSchema.findById(idFromCol))
          
            //Tạo card mới có thông tin card hiện tại
            const newTask = new TaskSchema(
                {
                _id: idTask,
                 title: task.title,
                 plan: task.plan,
                 column: idToCol,
                 index: task.index
                }
            );
               
            await this.taskSchema.findByIdAndDelete(idTask).exec();
            
            newTask.save();

            
            
            if(!newTask){
                throw new HttpException(409, 'New Task not found')
            }
            

           


            toCol.tasks.splice(indexMove, 0, {taskId: newTask._id.toHexString()});
            
            toCol.save();


            for(var i = 0; i < fromCol.tasks.length; i++){
                console.log("Task fromCol: " + fromCol.tasks[i].taskId);
                await this.taskSchema.findByIdAndUpdate(
                    fromCol.tasks[i].taskId,
                    {index: i},
                    {new: true}
                ).exec();
            }

            for(var i = 0; i < toCol.tasks.length; i++){
                await this.taskSchema.findByIdAndUpdate(
                    toCol.tasks[i].taskId,
                    {index: i},
                    {new: true}
                ).exec();
            }

            return task;

        }
        else{
    
            const idUpdate = new mongoose.Types.ObjectId(idTask);
            const indexTask = this.findIndexByObject(fromCol.tasks, idUpdate);
            
            console.log("indexTask: " + indexTask);
            await this.listTaskSchema.findByIdAndUpdate(
                idFromCol,
                {tasks: fromCol.tasks.splice(indexTask, 1)},
                {new: true}
            ).exec();
          
            console.log("length column " + await this.listTaskSchema.findById(idFromCol))

            const newTask = new TaskSchema(
                {
                 _id: idTask,
                 title: task.title,
                 plan: task.plan,
                 column: idFromCol,
                 index: task.index
                }
            );
            await this.taskSchema.findByIdAndDelete(idTask).exec();

            newTask.save();

            console.log("New Task: " + newTask._id + " name: " + task.title + " index: " + task.index);
            
            if(!newTask){
                throw new HttpException(409, 'New Task not found')
            }
            
            

            fromCol.tasks.splice(indexMove, 0, {taskId: newTask._id.toHexString()});
            
            fromCol.save();

            const arrayLength : number = fromCol.tasks.length;
            console.log(arrayLength);
            for(var i = 0; i < arrayLength; i++){
                console.log('task: ' + fromCol.tasks[i].taskId);
                await this.taskSchema.findByIdAndUpdate(
                    fromCol.tasks[i].taskId,
                    {index: i},
                    {new: true}
                ).exec();
            }


     
            return newTask;

        }
        
    }

    private  findIndexByObject(array: IItem[], searchObject: Object) {
        for (var i = 0; i < array.length; i++) {
          var currentObject = array[i];
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