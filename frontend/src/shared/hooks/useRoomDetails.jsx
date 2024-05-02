import { useState } from "react";
import {toast} from "react-hot-toast";
import { getRoomsDetails as getRoomsDetailsRequest } from "../../services";

export const useRoomDetails = () => {
    const [roomDetails, setRoomDetails] = useState();

    const getRoomsDetails = async (id) => {
        const responseData = await getRoomsDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información de la habitación'
            )
        }
        setRoomDetails(responseData)
    }

    return{
        roomDetails,
        isFetching: !roomDetails,
        getRoomsDetails
    }
}

