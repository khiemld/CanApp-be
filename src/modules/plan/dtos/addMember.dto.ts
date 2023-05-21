import { IsEmail, IsNotEmpty } from "class-validator";

export default class AddMemberDto{
    @IsNotEmpty()
    @IsEmail()
    public email : string
    
    constructor(email: string){
        this.email = email;
    }
}

