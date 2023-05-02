import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class RegisterDto{
    
    constructor(name: string, email: string, password: string, address: string, major: string, phone: string, birth_date: string){
        this.email = email;
        this.name = name;
        this.address = address;
        this.major = major; 
        this.password = password;
        this.phone = phone;
        this.birth_date = birth_date;
    }
    
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    @MinLength(8, {message: 'Password is to short'})
    @MaxLength(13, {message: 'Password is too long'})
    public password: string;
    @IsNotEmpty()
    public address: string;
    @IsNotEmpty()
    public major: string;
    @IsNotEmpty()
    public phone: string;
    @IsNotEmpty()
    public birth_date: string;
}