import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class LoginDto{
    
    constructor(email: string, password: string){
        this.email = email;   
        this.password = password;
    }
    
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    @MinLength(8, {message: 'Password is to short'})
    @MaxLength(13, {message: 'Password is too long'})
    public password: string;
 
}