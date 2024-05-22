import mongoose, { Schema } from "mongoose";

const roomSchema = mongoose.Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reservations: [{
        starDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }],
    estado:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Room', roomSchema)