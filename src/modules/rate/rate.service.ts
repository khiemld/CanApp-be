import { isEmptyObject } from "@core/utils";
import AddRateDto from "./dtos/addRate.dto";
import { HttpException } from "@core/exceptions";
import { IRate, RateSchema } from ".";
import { ProfileSchema } from "@modules/profile";
import { IRateList } from "@modules/profile/profile.interface";
import mongoose from "mongoose";
import { PlanSchema } from "@modules/plan";

class RateService {
  private rateSchema = RateSchema;

  public async addRate(model: AddRateDto) {
    if (isEmptyObject(model)) {
      throw new HttpException(409, "Model is empty");
    }

    const rateExist = await this.rateSchema
      .find({
        $and: [
          { member: new mongoose.Types.ObjectId(model.memberId).toHexString() },
          { judge: new mongoose.Types.ObjectId(model.judgeId).toHexString() },
          { plan: new mongoose.Types.ObjectId(model.planId).toHexString() },
        ],
      })
      .exec();

    if (rateExist.length > 0) {
      throw new HttpException(409, "You rated this member");
    }

    const currentDate = new Date();
    const newRate = this.rateSchema.create({
      createTime: `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`,
      judge: model.judgeId,
      member: model.memberId,
      plan: model.planId,
      ...model,
    });

    const profile = await ProfileSchema.find({ user: model.memberId }).exec();
    if (!profile) {
      throw new HttpException(400, "Profile not found");
    }

    const rate: IRateList = {
      attitude: model.attitude,
      expertise: model.expertise,
      discipline: model.discipline,
      collaborate: model.collaborate,
      performance: model.performance,
    };

    profile[0].rates.push(rate);
    await profile[0].save();

    return (await newRate).save();
  }

  public async getAllRate(){
    const rates = await this.rateSchema.find().exec();
    return rates;
  }

  public async getRateByPlanId(planId: string){
    const rates = await RateSchema.find({plan: new mongoose.Types.ObjectId(planId).toHexString()}).exec();
    if(!rates){
      throw new HttpException(400, 'Rates by plan id not found');
    }
    return rates;
  }
  
  
}

export default RateService;
