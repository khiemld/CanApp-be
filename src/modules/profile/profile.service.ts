import mongoose from "mongoose";
import { ProfileSchema } from ".";
import { HttpException } from "@core/exceptions";

export default class ProfileService {
  public async getProfile(userId: string): Promise<Object> {
    const profile = await ProfileSchema.findOne({
      user: new mongoose.Types.ObjectId(userId).toHexString(),
    })
      .populate("user")
      .exec();
    if (!profile) {
      throw new HttpException(400, "Profile not found");
    }

    return profile;
  }
}
