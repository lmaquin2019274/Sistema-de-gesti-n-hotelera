import mongoose, { Schema } from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'none'
    },
    location: {
        type: String,
    },
    category: {
        type: String,
    },
    comforts: {
        type: String,
    },
    capacity: {
        type: Number,
    }
})

export default mongoose.model('Hotel', hotelSchema)