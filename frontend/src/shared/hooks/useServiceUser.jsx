import { useState } from "react";
import {toast} from "react-hot-toast";
import { getServiUser as getServiceso } from "../../services";

export const useServiceUser = () => {
    const [services, setServices] = useState();

    const getServices = async (id) => {
        const responseData = await getServiceso(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información de la habitación'
            )
        }
        setServices(responseData)
    }

    return{
        services,
        isFetching: !services,
        getServices
    }
}