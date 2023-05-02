import mongoose from "mongoose";
import IUser from "./user.interface";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
        index: true,
    },
    password:{
        type: String,
        require: true,
    },
    idRole:{
        type: Number,
        default: 1,
    },
    image:{
        type: String,
        default: 'null',
    },
    address:{
        type: String,
        default: 'null',
    },
    major:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        unique: true,
        require: true
    },
    birthDate:{
        type: String,
        require: true
    },
    active:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model<IUser & mongoose.Document>('user', UserSchema);