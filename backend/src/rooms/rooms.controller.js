import { response, request } from "express";
import Room from './rooms.model.js';
import Hotel from '../hotels/hotels.model.js';

// Crear Habitación
export const createRoom = async (req, res) => {
<<<<<<< HEAD
    const { hotel, name, price, capacity, reservations, imgUrl } = req.body;

    try {
=======
    const { hotel, name, price, capacity, reservations } = req.body;

    try {
        // Verificar si el hotel existe
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
        const existingHotel = await Hotel.findById(hotel);
        if (!existingHotel) {
            return res.status(404).json({ msg: 'Hotel not found' });
        }

<<<<<<< HEAD
        const room = new Room({ hotel, name, price, capacity, reservations, imgUrl });
=======
        const room = new Room({ hotel, name, price, capacity, reservations });
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69

        await room.save();
        res.status(200).json({
            room
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Debe proporcionar el ID del hotel' });
    }
}

// Buscar habitaciones
export const getRoom = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { available: true };

<<<<<<< HEAD
    try {
        const [total, rooms] = await Promise.all([
            Room.countDocuments(query),
            Room.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('hotel', 'name')
                .exec()
        ]);

        res.status(200).json({
            total,
            rooms
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id)
            .populate('hotel', 'name')
            .exec();
        if (!room) {
            return res.status(404).send('Room not found');
        }
        return res.status(200).json(room);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

=======
    const [total, room] = await Promise.all([
        Room.countDocuments(query),
        Room.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        room
    });
}

>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
// Buscar por nombre
export const getRoomByName = async (req, res = response) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ msg: 'El nombre de la habitación es obligatorio en la consulta' });
    }

    const query = { name: { $regex: new RegExp(name, 'i') } };

    try {
        const rooms = await Room.find(query);

        if (rooms.length === 0) {
            return res.status(404).json({ msg: 'Habitaciones no encontradas' });
        }

        res.status(200).json({ rooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al buscar las habitaciones por nombre' });
    }
}

<<<<<<< HEAD

export const getRoomsByHotelId = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }

        const rooms = await Room.find({ hotel: hotel._id });
        const roomsWithHotelName = rooms.map(room => ({
            hotel: hotel.name,
            _id: room._id,
            name: room.name,
            available: room.available,
            price: room.price,
            capacity: room.capacity,
            imgUrl: room.imgUrl,
            reservations: room.reservations,   
        }));

        return res.status(200).json({ total: roomsWithHotelName.length, rooms: roomsWithHotelName });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

// Actualizar Disponibilidad de Habitación para Reservar
export const reserveRoom = async (req, res = response) => {
    const { id } = req.params;
    
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }

        if (!room.available) {
            return res.status(400).json({ msg: 'Room is already reserved' });
        }

        room.available = false;
        await room.save();

        res.status(200).json({
            msg: 'Room reserved successfully',
            room
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error reserving the room' });
    }
};

=======
>>>>>>> 00ef0ad4ad9ed86f369bdfeed4af5169c8fcea69
// Editar Habitación
export const updateRoom = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    if (!id) {
        return res.status(400).json({ msg: 'Necesita el ID para editar' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, rest, { new: true });

    if (!updatedRoom) {
        return res.status(404).json({ msg: 'Room not found' });
    }

    res.status(200).json({
        msg: 'Room updated',
        room: updatedRoom
    });
}

// Editar Disponibilidad de Habitación
export const updateRoomAvailability = async (req, res = response) => {
    const { id } = req.params;
    const { available } = req.body;

    if (!id) {
        return res.status(400).json({ msg: 'Necesita el ID para editar la disponibilidad' });
    }

    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, { available }, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ msg: 'Habitación no encontrada' });
        }

        res.status(200).json({
            msg: 'Disponibilidad de habitación actualizada',
            room: updatedRoom
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la disponibilidad de la habitación' });
    }
}



// Eliminar Habitaciones
export const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findByIdAndDelete(id);

        if (!room) {
            return res.status(404).json({ message: 'Room no encontrado' });
        }

        res.status(200).json({ message: 'Room eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Room' });
    }
};