/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { getBadEvents as getHotelEventsRequest } from "../../services";

export const useBadEvents = () => {
    const [events, setEvents] = useState([]);

    const getHotelEvents = async (id) => {
        try {
            const eventsData = await getHotelEventsRequest(id);
            if (eventsData.error) {
                return;
            }
            let eventsArray = [];
            if (Array.isArray(eventsData.data)) {
                eventsArray = eventsData.data;
            } else if (eventsData.data) {
                eventsArray = [eventsData.data];
            }

            setEvents(eventsArray);
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
