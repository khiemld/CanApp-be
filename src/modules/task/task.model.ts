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
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
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
        user:
            {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    index: {
        type: Number
    }
});

export default mongoose.model<ITask & mongoose.Document>('task', TaskSchema);