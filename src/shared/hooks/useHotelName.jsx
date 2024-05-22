import { useState } from "react";
import {toast} from "react-hot-toast";
import { getHotelName as getHotelNameqqq } from "../../services";

export const useHotelName = () => {
    const [hotelDetails, setHotelDetails] = useState();

    const getHotelName = async (name) => {

        console.log(name)
        const responseData = await getHotelNameqqq({name})

        if(responseData.error){
            console.log('Error:', responseData.e);
            console.log('Error Response:', responseData.e.response);
            console.log('Error Data:', responseData.e.response?.data);
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del hotel'
            )
        }
        setHotelDetails(responseData)
    }

    return{
        hotelDetails,
        isFetchingss: !hotelDetails,
        getHotelName
    }
}

