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
    beginTime: {
        type: Date,
        require: true,
        default: Date.now
    },
    endTime: {
        type: Date,
        require: true
    },
    state:{
        type: Number,
        default: 1
    },
    members: [{
        type:  mongoose.Schema.Types.ObjectId
    }]

});

export default mongoose.model<ITask & mongoose.Document>('task', TaskSchema);