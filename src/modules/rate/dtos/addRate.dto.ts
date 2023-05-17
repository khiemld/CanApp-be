import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export default class AddRateDto{
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
    
    constructor(attitude: number, expertise: number, discipline: number, collaborate: number,  performance: number, comment: string){
        this.attitude = attitude;
        this.expertise = expertise;
        this.discipline = discipline;
        this.collaborate = collaborate;
        this.performance = performance;
        this.comment = comment;
    }
}
