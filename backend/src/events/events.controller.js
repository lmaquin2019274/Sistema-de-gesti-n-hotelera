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

        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};