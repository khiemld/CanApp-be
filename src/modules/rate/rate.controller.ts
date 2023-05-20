import { TransformationType } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import AddRateDto from "./dtos/addRate.dto";
import RateService from "./rate.service";

export default class RateController{ 
    public createRate = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const memberId = req.params.member_id;
            const judgeId = req.params.judge_id;
            const model : AddRateDto = req.body;
            let rate = await new RateService().addRate(memberId, judgeId, model);
            res.status(201).json({
                error: false,
                message: 'Rate successfully',
                rate: rate
            });
        }
        catch(error){
            next(error);
        }
    }
}