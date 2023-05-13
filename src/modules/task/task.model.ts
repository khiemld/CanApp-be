import mongoose from "mongoose";
import ITask from "./task.interface";


const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listTask'
    },
    beginTime: {
        type: String,
        require: true,
    },
    endTime: {
        type: String,
        require: true
    },
    members: [{
        userId:
            {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    index: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model<ITask & mongoose.Document>('task', TaskSchema);