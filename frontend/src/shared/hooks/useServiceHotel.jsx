import { useState } from "react";
import {toast} from "react-hot-toast";
import { getServiceHotel as getServiceso } from "../../services";

export const useServiceHotel = () => {
    const [servicesH, setServicesH] = useState();

    const getServicesH = async (id) => {
        const responseData = await getServiceso(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información de la habitación'
            )
        }
        setServicesH(responseData)
    }

    return{
        servicesH,
        isFetchingH: !servicesH,
        getServicesH
    }
}