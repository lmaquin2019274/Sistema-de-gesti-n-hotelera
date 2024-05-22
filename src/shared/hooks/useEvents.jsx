/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import {  getEvents as getEventsRequest} from "../../services"


export const useEvents = () => {
    const [ events, setEvents ] = useState([]);

    const getEvents = async (isLogged = false) => {
        try {
            const eventsData = await getEventsRequest();
            if (eventsData.error) {
                return toast.error(
                    eventsData.e?.response?.data || 'Error ocurred when reading events'
                );
            }

            setEvents(eventsData.data)
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return {
        getEvents,
        isFetching: !Boolean(events),
        allEvents: events
    };
};