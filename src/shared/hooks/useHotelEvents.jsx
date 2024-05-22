import { useState } from "react";
import { check, validationResult } from "express-validator";
import toast from "react-hot-toast";
import { getHotelEvents as getHotelEventsRequest } from "../../services";
import { useParams } from "react-router-dom";

export const useHotelEvents = () => {
    const [events, setEvents] = useState([]);
    const { "*": route } = useParams();
    const id = route.split("/").pop();

    const validateMongoId = async (id) => {
        await check('id', 'Invalid hotel ID').isMongoId().run({ params: { id } });
        const result = validationResult({ params: { id } });
        if (!result.isEmpty()) {
            return { valid: false, errors: result.array() };
        }
        return { valid: true, errors: [] };
    };

    const getHotelEvents = async (isLogged = false) => {
        try {
            if (id !== 'hotel' && id !== 'room' && id !== 'event') {
                const { valid, errors } = await validateMongoId(id);
                if (!valid) {
                    return toast.error(errors[0].msg);
                }

                const eventsData = await getHotelEventsRequest(id);
                if (eventsData.error) {
                    return;
                }

                setEvents(eventsData.data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return {
        getHotelEvents,
        isFetching: !Boolean(events),
        allHotelEvents: events
    };
};