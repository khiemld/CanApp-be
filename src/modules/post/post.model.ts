import mongoose from "mongoose";
import { IPost } from "./post.interface";


const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        require: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [{
        user: {
            type:mongoose.Schema.Types.String,
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.String,
            ref: 'user'
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        text: {
            type: String,
        },
        date: {
            type: String,
        }
    }],
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    date: {
        type: String
    }

});
export default mongoose.model<IPost & Document>('posts', PostSchema);