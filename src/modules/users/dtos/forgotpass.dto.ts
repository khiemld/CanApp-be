import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class ForgotPassDto{
    
    constructor(newPass: string){  
        this.newPass = newPass;
    }

    @IsNotEmpty()
    @MinLength(8, {message: 'Password is to short'})
    @MaxLength(13, {message: 'Password is too long'})
    public newPass: string;
 
}