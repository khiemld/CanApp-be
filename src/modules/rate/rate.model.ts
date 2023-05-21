import mongoose from "mongoose";
import IRate from "./rate.interface";

const RateSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    attitude:{
         type: Number,
         require: true,
         default: 0
    },
    expertise:{
        type: Number,
        require: true,
        default: 0
    },
    discipline:{
        type: Number,
        require: true,
        default: 0
    },
    collaborate:{
        type: Number,
        require: true,
        default: 0
    },
    performance: {
        type: Number,
        require: true,
        default: 0
    },
    comment: {
        type: String,
        require: true
    },
    createTime: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
    },
}); 

export default mongoose.model<IRate & mongoose.Document>('rates', RateSchema);