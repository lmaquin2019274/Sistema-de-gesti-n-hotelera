import mongoose, { Schema } from "mongoose";

const roomSchema = mongoose.Schema({
    available: {
        type: Boolean,
        default: true
    },
    hotel: {
        type: String
    },
    price: {
        type: String,
        type: SchemaTypes.Double,
        required: true,
        min: 0.01
    },
    name: {
        type: String,
        default: 'none'
    },
    capacityPeople: {
        type: Number,
    }
})

export default mongoose.model('Room', roomSchema)