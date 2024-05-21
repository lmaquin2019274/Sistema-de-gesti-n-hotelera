import { useState } from "react";
import {toast} from "react-hot-toast";
import { getServiceDetails as getServicesDetailsRequest } from "../../services";

export const useServiceDetails = () => {
    const [serviceDetails, setServiceDetails] = useState();

    const getServicesDetails = async (id) => {
        const responseData = await getServicesDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información de la habitación'
            )
        }
        setServiceDetails(responseData)
    }

    return{
        serviceDetails,
        isFetching: !serviceDetails,
        getServicesDetails
    }
}

