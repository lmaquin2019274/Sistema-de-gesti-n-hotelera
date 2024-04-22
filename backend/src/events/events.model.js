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
    dates: {
        type: String,
    },
    capacity: {
        type: Number,
    }
})

export default mongoose.model('Event', eventSchema)