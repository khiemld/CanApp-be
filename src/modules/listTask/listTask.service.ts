import { isEmptyObject } from '@core/utils';
import AddListDto from './dtos/addList.dto';
import IListTask from './listTask.interface';
import ListTaskSchema from './listTask.model'
import { HttpException } from '@core/exceptions';
import { PlanSchema } from '@modules/plan';
import { UserSchema } from '@modules/users';
import { IList, IMember } from '@modules/plan/plan.interface';

import mongoose, { Query } from 'mongoose'

class ListTaskService{
    public listTaskSchema = ListTaskSchema;
    public planSchema = PlanSchema;
    public userSchema = UserSchema;

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
}


export default ListTaskService;