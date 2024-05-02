import mongoose, { Schema } from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
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
        type: String,
    },
    imgUrl: {
        type: String,
    },
    coordenadas:{
        type: String,
    }
})

export default mongoose.model('Hotel', hotelSchema)