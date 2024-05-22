import { response, request } from 'express';
import Services from './servicesUsers.model.js';
import Room from '../rooms/rooms.model.js';
import Event from '../events/events.model.js';
import Hotel from '../hotels/hotels.model.js'
import User from '../users/user.model.js'

export const createService = async (req, res) => {
    const { service, hotel, user, reservations } = req.body;

    try {
        let isServiceUpdated = false;

        const isEvent = await Event.findByIdAndUpdate(service, { available: false }, { new: true });
        if (isEvent) {
            isServiceUpdated = true;
        } else {
            const isRoom = await Room.findByIdAndUpdate(service, { available: false }, { new: true });
            if (isRoom) {
                isServiceUpdated = true;
            }
        }

        if (!isServiceUpdated) {
            console.error('Service not found');
            return res.status(404).json({ msg: 'Service not found' });
        }

        const newService = new Services({ service, hotel, user, reservations });
        await newService.save();

        return res.status(200).json({
            service: newService
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred' });
    }
};

export const listServiceId = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        console.log(id);

        const event = await Event.findOne({ estado: true, _id: id });
        console.log(event);

        if (event) {
            return res.status(200).json(event);
        }

        const room = await Room.findOne({ estado: true, _id: id });
        console.log(room);

        if (room) {
            return res.status(200).json(room);
        }

        return res.status(404).json({ error: 'No se encontró el evento o la habitación con el id proporcionado.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


export const listServiceHotel = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        return res.status(404).send('Hotel not found');
    }


    const query = { estado: true, hotel: hotel };

    try {
        const [total, services] = await Promise.all([
            Services.countDocuments(query),
            Services.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .exec()
        ]);

        res.status(200).json({
            total,
            services
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const listServiceUser = async (req = request, res = response) => {
    const { id } = req.params;

    console.log(id)

    try {

        const services = await Services.find({ estado: true, user: id });
        res.status(200).json(services);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const services = await Services.findByIdAndDelete(id);
        if (!services) {
            return res.status(404).json({
                msg: 'Servicio no encontrado'
            });
        }
        res.json({
            msg: 'Servicio eliminado'
        });
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).json({
            msg: 'Error al eliminar el servicio'
        });
    }
};

export const listAllServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json(services);
    } catch (error) {
        console.error('Error al listar los servicios:', error);
        res.status(500).json({
            msg: 'Error al listar los servicios'
        });
    }
};