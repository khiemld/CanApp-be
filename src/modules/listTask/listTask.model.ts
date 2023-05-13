import mongoose from "mongoose";
import IListTask from "./listTask.interface";


const ListTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'task'
            }
        }
    ],
    index: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model<IListTask & mongoose.Document>('listTask', ListTaskSchema);