import Event from "./events.model.js";

export const listEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const { name, description, hotel, date, capacity, imgUrl } = req.body;

        const newEvent = new Event({
            name,
            description,
            hotel,
            date,
            capacity,
            imgUrl
        });

        const createdEvent = await newEvent.save();

        res.status(201).json({ message: "Created Event", createdEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, description, hotel, date, capacity, imgUrl } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            name,
            description,
            hotel,
            date,
            capacity,
            imgUrl
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Updated Event", updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Deleted Event", deletedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findEventsByHotel = async (req, res) => {
    try {
        const hotelName = req.body.hotel; 

        const events = await Event.find({ hotel: hotelName });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this hotel" });
        }

        res.status(200).json({ message: `Events for the hotel ${hotelName}`, events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findEventsByName = async (req, res) => {
    try {
        const name = req.body.name; 

        const events = await Event.find({ name: name });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this name" });
        }

        res.status(200).json({ message: `Events for the name ${name}`, events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

