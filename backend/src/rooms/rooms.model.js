import mongoose, { Schema } from "mongoose";

const roomSchema = mongoose.Schema({
    hotel: {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
        ref: 'Hotel',
=======
        ref: 'Hotel', // Referencia al modelo Hotel
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
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
<<<<<<< HEAD
    imgUrl: {
=======
    avatarUrl: {
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
        type: String,
        default: 'none'
    },
    reservations: [{
<<<<<<< HEAD
        startDate: {
=======
        starDate: {
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
            type: Date
        },
        endDate: {
            type: Date
        }
    }]
})

export default mongoose.model('Room', roomSchema)