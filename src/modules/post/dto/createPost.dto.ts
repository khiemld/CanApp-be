import { IsNotEmpty } from "class-validator";

export default class CreatePostDto {
    @IsNotEmpty()
    public text : string
    
    constructor(text: string){
        this.text = text;
    }
}
