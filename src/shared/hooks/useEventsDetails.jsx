import { useState } from "react";
import {toast} from "react-hot-toast";
import { getEventDetails as getEventDetailsRequest } from "../../services";

export const useEventsDetails = () => {
    const [eventDetails, setEventDetails] = useState();

    const getEventDetails = async (id) => {
        const responseData = await getEventDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del evento'
            )
        }
        setEventDetails(responseData)
    }

    return{
        eventDetails,
        isFetching: !eventDetails,
        getEventDetails
    }
}

