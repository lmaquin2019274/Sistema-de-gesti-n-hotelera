import hotels from '../hotels/hotels.model'
import bcryptjs from 'bcryptjs'
import user from '../users/user.model.js'


export const createHotel = async (req, res) => {
    try {
        const { name, location, category, comforts, capacity } = req.body;
        
        const newHotel = new Hotel({
            name,
            location,
            category,
            comforts,
            capacity
        });

        const savedHotel = await newHotel.save();

        return res.status(201).json(savedHotel);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating');
    }
};


export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        return res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        return res.status(500).send('The data could not be obtained');
    }
};


export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }
        return res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};


export const updateHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, category, comforts, capacity } = req.body;

        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            name,
            location,
            category,
            comforts,
            capacity
        }, { new: true });

        if (!updatedHotel) {
            return res.status(404).send('The hotel has not been located');
        }

        return res.status(200).json(updatedHotel);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};


export const deleteHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        
        if (!deletedHotel) {
            throw new Error('Hotel not found');
        }
        
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
}
