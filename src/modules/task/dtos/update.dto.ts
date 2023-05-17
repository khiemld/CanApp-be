import { IsNotEmpty } from "class-validator";


export default class UpdateTaskDto{
    
    constructor(description: string, beginTime: string, endTime: string){
        this.description = description;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }
    
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public beginTime: string;
    @IsNotEmpty()
    public endTime: string;
    
}