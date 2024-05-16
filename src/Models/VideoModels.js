import { Schema, model, Types } from "mongoose"

const VideoSchema = new Schema({
    Videofile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true

    },
    tittle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default:0
    },
    ispublished:{
        type: Types.ObjectId,
            ref: "User"
    }
},
    {
        timestamps: true
    })


const Video = model("Video", VideoSchema)
export default Video;