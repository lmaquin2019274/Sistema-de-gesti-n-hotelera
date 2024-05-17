/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import { getHotelEvents as getHotelEventsRequest } from "../../services"
import { useParams } from "react-router-dom";

export const useHotelEvents = () => {
    const [events, setEvents] = useState([]);


    const { "*": route } = useParams();
    const id = route.split("/").pop();
    console.log("Hotel ID:", id);

    const getHotelEvents = async (isLogged = false) => {
        try {
            if (id !== 'hotel' && id !== 'room' && id !== 'event') {
                const eventsData = await getHotelEventsRequest(id);
                console.log(eventsData)
                if (eventsData.error) {
                    return toast.error(
                        eventsData.e?.response?.data || 'Error ocurred when reading events'
                    );
                }

                setEvents(eventsData.data)
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