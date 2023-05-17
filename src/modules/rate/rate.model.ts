import mongoose from "mongoose";
import IRate from "./rate.interface";

const RateSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
        
    },
    attitude:{
         type: Number,
         require: true
    },
    expertise:{
        type: Number,
         require: true
    },
    discipline:{
        type: Number,
         require: true
    },
    collaborate:{
        type: Number,
         require: true
    },
    performance: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true,
    },
}); 

export default mongoose.model<IRate & mongoose.Document>('rates', RateSchema);