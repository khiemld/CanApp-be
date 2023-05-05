import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class CreateTaskDto{
    
    constructor(title: string, description: string, start_time: Date, end_time: Date){
        this.title = title;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time;
    }
    
    @IsNotEmpty()
    public title: string;
    public description: string;
    @IsNotEmpty()
    public start_time: Date;
    @IsNotEmpty()
    public end_time: Date;
}