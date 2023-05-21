import { IsNotEmpty } from "class-validator";

export default class CreatePostDto {
    @IsNotEmpty()
    public text : string;

    @IsNotEmpty()
    public title: string;
    
    constructor(title: string, text: string){
        this.title = title;
        this.text = text;
        
    }
}
