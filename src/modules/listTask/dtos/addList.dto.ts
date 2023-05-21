import { IsNotEmpty } from "class-validator";


export default class AddListDto{
    @IsNotEmpty()
    public name: string;
   
    constructor(name: string){
        this.name = name;
    }
}