import { IsNotEmpty} from "class-validator";

export default class CreateTaskDto{
    
    constructor(title: string, description: string, start_time: Date, end_time: Date){
        this.title = title;
    }
    
    @IsNotEmpty()
    public title: string;
}