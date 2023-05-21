import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export default class AddRateDto{
    @IsString()
    public memberId: string;
    @IsString()
    public judgeId: string;
    @IsString()
    public planId : string;
    @IsNotEmpty()
    @IsNumber()
    public attitude : number;
    @IsNotEmpty()
    @IsNumber()
    public expertise : number;
    @IsNotEmpty()
    @IsNumber()
    public discipline : number;
    @IsNotEmpty()
    @IsNumber()
    public collaborate : number;
    @IsNotEmpty()
    @IsNumber()
    public performance : number;
    @IsNotEmpty()
    @IsString()
    public comment : string;
    
    constructor(memberId: string, judgeId: string, planId: string, attitude: number, expertise: number, discipline: number, collaborate: number,  performance: number, comment: string){
        this.memberId = memberId;
        this.judgeId = judgeId;
        this.planId = planId;
        this.attitude = attitude;
        this.expertise = expertise;
        this.discipline = discipline;
        this.collaborate = collaborate;
        this.performance = performance;
        this.comment = comment;
    }
}
