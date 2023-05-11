import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export default class UpdateDto{
    
    constructor(name: string, email: string, address: string, major: string, phone: string, birth_date: string){
        this.email = email;
        this.name = name;
        this.address = address;
        this.major = major; 
        this.phone = phone;
        this.birth_date = birth_date;
    }
    
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    public address: string;
    @IsNotEmpty()
    public major: string;
    @IsNotEmpty()
    public phone: string;
    @IsNotEmpty()
    public birth_date: string;
}