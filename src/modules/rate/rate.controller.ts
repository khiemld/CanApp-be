import { TransformationType } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import AddRateDto from "./dtos/addRate.dto";
import RateService from "./rate.service";

export default class RateController{ 
    public createRate = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model : AddRateDto = req.body;
            let rate = await new RateService().addRate(model);
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

    public getAllRates = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let rates = await new RateService().getAllRate();
            res.status(201).json(rates);
        }
        catch(error){
            next(error);
        }
    }

    public getRatesByPlanId =async (req: Request, res: Response, next: NextFunction) => {
        try{

            const planId = req.params.plan_id;
            let rates = await new RateService().getRateByPlanId(planId);
            res.status(201).json(rates);
        }
        catch(error){
            next(error);
        }
    }
}