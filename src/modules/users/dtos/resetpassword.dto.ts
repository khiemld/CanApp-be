import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class ResetPassDto{
    
    constructor(oldPass: string, newPass: string){
        this.oldPass = oldPass;   
        this.newPass = newPass;
    }

    @IsNotEmpty()
    @MinLength(8, {message: 'Password is to short'})
    @MaxLength(13, {message: 'Password is too long'})
    public oldPass: string;
    @IsNotEmpty()
    @MinLength(8, {message: 'Password is to short'})
    @MaxLength(13, {message: 'Password is too long'})
    public newPass: string;
 
}