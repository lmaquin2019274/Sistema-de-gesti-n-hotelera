import { useState } from "react";
import {toast} from "react-hot-toast";
import { getHotelsDetails as getHotelsDetailsRequest } from "../../services";

export const useHotelDetails = () => {
    const [hotelDetails, setHotelDetails] = useState();

    const getHotelsDetails = async (id) => {
        const responseData = await getHotelsDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del hotel'
            )
        }
        setHotelDetails(responseData)
    }

    return{
        hotelDetails,
        isFetching: !hotelDetails,
        getHotelsDetails
    }
}

