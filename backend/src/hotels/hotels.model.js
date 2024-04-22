import mongoose, { Schema } from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String
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
    name: {
        type: String,
        default: 'none'
    },
    capacity: {
        type: Number,
    }
})

export default mongoose.model('Hotel', hotelSchema)