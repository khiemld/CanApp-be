import PlanSchema from "./plan.model"
import CreatePlanDto from "./dtos/createPlan.dto"
import IPlan, { IMember } from "./plan.interface";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import UserSchema from '@modules/users/user.model'
import UserService from '@modules/users/user.service'
import AddMemberDto from "./dtos/addMember.dto";
import { IUser } from "@modules/users";

class PlanService{
    public planSchema = PlanSchema;
    public userService = new UserService();
    public userSchema = UserSchema;

    public async createPlan(idLead: string, model: CreatePlanDto): Promise<IPlan>{
    
        if(isEmptyObject(model))
            throw new HttpException(400, 'Model is empty');
        const plan = await this.planSchema.findOne({name: model.name}).exec();

        if(plan){
            throw new HttpException(409, 'Plan already exist');   
        }

        const user = this.userSchema.findById(idLead).exec();

        if(!user){
            throw new HttpException(400, 'Id User does not exist');
        }
       
        const newPlan = new PlanSchema({
            name: model.name,
            description: model.description,
            manager: idLead,
            beginTime: model.start_date,
            endTime: model.end_date
        });

        return await newPlan.save();
    }

    public async blockPlan(idLead: string, idProject: string ): Promise<IPlan>{
         const plan = await this.getPlanById(idProject);

         if(plan.manager == idLead){
             plan.active = false;
         }
         else{
            throw new HttpException(403, 'You are not allowed to block plan');
         }
         return await plan;
    }


    public async updatePlan(idLead: string, idProject: string, model: CreatePlanDto ) : Promise<IPlan>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is not empty');
        }
        
        const plan = await this.planSchema.findById(idProject).exec();

        if(!plan){
            throw new  HttpException(400, 'Plan does not exit');
        }

        let updateGroup;

        if(plan.manager === idLead){
            const groupFields = {...CreatePlanDto};
            updateGroup = await PlanSchema.findByIdAndUpdate(
                {_id: idProject},
                {$set: groupFields},
                {new: true}
            ).exec();
           
        }
        else{
            throw new HttpException(403, 'You are not allowed to block plan');
        }

        if(!updateGroup){
            throw new HttpException(400, 'Group update is not successfully')
        }

        return updateGroup;
    }

    public async getPlanById(idPlan: string) : Promise<IPlan>{
        const plan = await this.planSchema.findById(idPlan).exec();

       if(!plan){
            throw new  HttpException(400, 'Plan does not exit');
       }

       return  plan;
    }

    
    public async getAllPlans() : Promise<IPlan[]>{
        const plans = await this.planSchema.find().exec();
        return plans;
    }

    public async addMember(idPlan: string, model:AddMemberDto) : Promise<IPlan>{
        const plan = await this.planSchema.findById(idPlan).exec();
        const user  = await this.userService.getUserByEmail(model.email);
        

        if(!plan){
            throw new HttpException(409, 'Id Plan is not exist');
        }

        if(!user){
            throw new HttpException(409, 'User is not found');
        }
        

        if(!plan.members.some((member: IMember) => member.userId === user._id)){
            throw new HttpException(400, 'Account has been a member of this group');
        }

        plan.members.unshift({userId: user._id} as IMember);

        return await plan.save();
    }
}

export default PlanService;