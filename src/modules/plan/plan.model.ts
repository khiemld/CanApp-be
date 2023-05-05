import mongoose from "mongoose";
import IPlan from "./plan.interface";

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        default: null
        
    },
    manager:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    beginTime:{
        type: String,
        require: true
    },
    endTime:{
        type: String,
        require: true
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }],
    active: {
        type: Boolean,
        default: true,
    }
}); 

export default mongoose.model<IPlan & mongoose.Document>('plan', PlanSchema);