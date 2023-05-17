import { isEmptyObject } from "@core/utils";
import AddRateDto from "./dtos/addRate.dto";
import { HttpException } from "@core/exceptions";
import { RateSchema } from ".";




class RateService{
    private rateSchema = RateSchema;


    
    public async addRate(memberId: string, judgeId: string, model: AddRateDto){
        if(isEmptyObject(model)){
            throw new HttpException(409, 'Model is empty');
        }

        const newRate = this.rateSchema.create({
            member: memberId,
            judge: judgeId,
            ...model,
        });

        

        return (await newRate).save();

    }

    
}

export default RateService;