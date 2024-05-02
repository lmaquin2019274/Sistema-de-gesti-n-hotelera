import { response, request } from "express";
import Room from './rooms.model.js';
import Hotel from '../hotels/hotels.model.js';

// Crear Habitación
export const createRoom = async (req, res) => {
    const { hotel, name, price, capacity, reservations } = req.body;

    try {
        // Verificar si el hotel existe
        const existingHotel = await Hotel.findById(hotel);
        if (!existingHotel) {
            return res.status(404).json({ msg: 'Hotel not found' });
        }

        const room = new Room({ hotel, name, price, capacity, reservations });

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