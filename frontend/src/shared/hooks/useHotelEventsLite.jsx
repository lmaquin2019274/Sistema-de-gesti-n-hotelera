/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { getHotelEvents as getHotelEventsRequest } from "../../services";

export const useHotelEventsLite = () => {
    const [events, setEvents] = useState([]);

    const getHotelEvents = async (id) => {
        try {
            const eventsData = await getHotelEventsRequest(id);
            if (eventsData.error) {
                return;
            }
            setEvents(eventsData.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return {
        getHotelEvents,
        isFetching: !Boolean(events.length),
        allHotelEvents: events
    };
};
