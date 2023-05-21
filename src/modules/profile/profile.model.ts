import mongoose from "mongoose";
import IProfile from "./profile.interface";


const ProfileSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rates: [{
        attitude : {
            type: Number,
            default: 0
        },
        expertise : {
            type: Number,
            default: 0
        },
        discipline : {
            type: Number,
            default: 0
        },
        collaborate : {
            type: Number,
            default: 0
        },
        performance : {
            type: Number,
            default: 0
        }
    }]
});

export default mongoose.model<IProfile & mongoose.Document>('profiles', ProfileSchema);