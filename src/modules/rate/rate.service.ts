import { isEmptyObject } from "@core/utils";
import AddRateDto from "./dtos/addRate.dto";
import { HttpException } from "@core/exceptions";
import { IRate, RateSchema } from ".";
import { ProfileSchema } from "@modules/profile";
import { IRateList } from "@modules/profile/profile.interface";

class RateService {
  private rateSchema = RateSchema;

  public async addRate(memberId: string, judgeId: string, model: AddRateDto) {
    if (isEmptyObject(model)) {
      throw new HttpException(409, "Model is empty");
    }

    const newRate = this.rateSchema.create({
      member: memberId,
      judge: judgeId,
      ...model,
    });

    const profile = await ProfileSchema.find({ user: memberId }).exec();
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

    return (await newRate).save();
  }

}

export default RateService;
