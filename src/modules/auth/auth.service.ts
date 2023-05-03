import { DataStoredInToken, TokenData } from "@modules/auth";

import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';

import { permittedCrossDomainPolicies } from "helmet";
import jwt from 'jsonwebtoken';
import LoginDto from "./auth.dto";

import { IUser, UserSchema } from "@modules/users";

class AuthService{
    public userSchema = UserSchema;

    public async login(model:LoginDto) : Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email});

        if(!user){
            throw new HttpException(409, `Your email ${model.email} is not exist`)
        }

        const isMatchPassword = bcryptjs.compare(model.password, user.password);

        if(!isMatchPassword){
            throw new HttpException(400, 'Credential is not valid');
        }

        return this.createToken(user);
    }

    private createToken(user : IUser) : TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};
        const secret : string = process.env.JWT_TOKEN_SECRET!;
        const expireIn : number = 60;
        return{
            token: jwt.sign(dataInToken, secret, {expiresIn: expireIn}),
        }
    }

    public async getCurrentLoginUser(userId: string) : Promise<IUser>{
        const user = await this.userSchema.findById(userId).exec();

       
        if(!user){
            throw new HttpException(404, `User is not exits`)
        }

        return user;
    }

}


export default AuthService;