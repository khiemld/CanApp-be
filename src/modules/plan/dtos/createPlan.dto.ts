import { IsNotEmpty } from "class-validator";


export default class CreatePlanDto{
    @IsNotEmpty()
    public name: string;
    public description: string;
    @IsNotEmpty()
    public start_date: string;
    @IsNotEmpty()
    public end_date: string;

    constructor(name: string, description: string, start_date: string, end_date: string){
        this.name = name;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}