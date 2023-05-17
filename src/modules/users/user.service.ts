import { DataStoredInToken, TokenData } from "@modules/auth";
import UserSchema from "./user.model"
import RegisterDto from "./dtos/register.dto";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from "./user.interface";
import { permittedCrossDomainPolicies } from "helmet";
import jwt from 'jsonwebtoken';
import UpdateDto from "./dtos/update.dto";
import ResetPassDto from "./dtos/resetpassword.dto";
import ForgotPassDto from "./dtos/forgotpass.dto";
import IProfile from "@modules/profile/profile.interface";
import { ProfileSchema } from "@modules/profile";


class  UserService{
    public userSchema = UserSchema;
    public profileSchema = ProfileSchema;

    public async createUser(model:RegisterDto) : Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email}).exec();

        if(user){
            throw new HttpException(409, `Your email ${model.email} already exist`)
        }


        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(model.password!, salt);

        const createdUser :  IUser = await this.userSchema.create({
            ...model,
            password: hashedPassword
        });

        await this.profileSchema.create({
            user: createdUser._id
        });

        return this.createToken(createdUser);
    }

    public async updateUser(userId: string, model:UpdateDto) : Promise<IUser>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findById(userId).exec();

        if(!user){
            throw new HttpException(400, 'User Id is not exit')
        }
    
        if(user.email != model.email)
            throw new HttpException(400, 'Email not allow to update');

        const checkPhoneExist = await this.userSchema.find({
            $and:[{phone: {$eq:model.phone}}, {_id: {$ne: userId}}]
        }).exec();


        if(checkPhoneExist.length !== 0){
            throw new HttpException(400, 'Phone is used by another user');
        }
        
        let updateUserById;

        updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
            ...model,
        }, 
        {new: true}
        ).exec();
        


       if(!updateUserById){
            throw new HttpException(409, 'You are not an user');
       }

       return updateUserById;
    }

    public async getUserById(userId: string) : Promise<IUser>{
        const user = await this.userSchema.findById(userId).exec();

        if(!user){
            throw new HttpException(404, `User is not exits`)
        }

        return user;
    }

    public async getUserByEmail(email: string) : Promise<IUser>{
        const user = await this.userSchema.findOne({email: email}).exec();

        if(!user){
            throw new HttpException(404, 'User is not found');
        }

        return user;
    }

    public async getAllUser() : Promise<IUser[]>{
        const users = await this.userSchema.find().exec();
        return users;
    }

    public async uploadImage(userId : string, avatar: string) : Promise<IUser>{
         const user = await this.userSchema.findById(userId).exec();

         if(!user){
            throw new HttpException(404, 'Invalid userId');
         }

         const updateUser = await this.userSchema.findByIdAndUpdate(
            userId, 
            {image: avatar},
            {new: true}
         ).exec();

         if(!updateUser){
            throw new HttpException(404, 'User is not found');
         }

         return updateUser;
    }

  
    private createToken(user : IUser) : TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};
        const secret : string = process.env.JWT_TOKEN_SECRET!;
        const expireIn : number = 60;
        return{
            token: jwt.sign(dataInToken, secret, {expiresIn: expireIn}),
        }
    }

    public async resetPassword(userId: string, model: ResetPassDto) : Promise<IUser>{
        const user = await this.userSchema.findById(userId).exec();

        if(!user){
            throw new HttpException(409, 'User not found');
        }

        const salt = await bcryptjs.genSalt(10);
        const newHashedPassword = await bcryptjs.hash(model.newPass!, salt);

    
        const isMatch = bcryptjs.compareSync(model.oldPass, user.password);
        if(isMatch){
          if(model.newPass !== model.oldPass){
                await this.userSchema.findByIdAndUpdate(
                        userId,
                        {password: newHashedPassword},
                        { new: true }).exec();
          }
          else{
            throw new HttpException(409, 'New password and old password is the same');
          }
          
        }
        else{
            throw new HttpException(409, 'Old Password is not correct');
        }
        return user;
    }

    public async forgetPassword(userId: string, model: ForgotPassDto) : Promise<IUser>{
        const user = await this.userSchema.findById(userId).exec();

        if(!user){
            throw new HttpException(409, 'User not found');
        }

        const salt = await bcryptjs.genSalt(10);
        const newHashedPassword = await bcryptjs.hash(model.newPass!, salt);
        
        const newUser = await this.userSchema.findByIdAndUpdate(
                userId,
                {password: newHashedPassword},
                { new: true }).exec();

        if(!newUser){
            throw new HttpException(409, 'Can not update user')
        }

        return newUser;
    }

    
}


export default UserService;