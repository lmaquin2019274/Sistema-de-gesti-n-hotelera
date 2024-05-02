import mongoose, { Schema } from "mongoose";

const roomSchema = mongoose.Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel', // Referencia al modelo Hotel
        required: true
    },
    name: {
        type: String,
        default: 'none',
    },
    available: {
        type: Boolean,
        default: true
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        min: 0.01
    },
    capacity: {
        type: Number,
    },
    avatarUrl: {
        type: String,
        default: 'none'
    },
    reservations: [{
        starDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }]
})

export default mongoose.model('Room', roomSchema)