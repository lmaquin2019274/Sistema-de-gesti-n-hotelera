import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    hotel: {
        type: String,
    },
    date: {
        type: Date,
    },
    capacity: {
        type: Number,
    },
    imgUrl: {
        type: String
    }
})

export default mongoose.model('Event', eventSchema)