import { useState } from "react";
import {toast} from "react-hot-toast";
import { getServiUser as getServiceso } from "../../services";

export const useServiceUser = () => {
    const [servicesU, setServices] = useState();

    const getServicesU = async (id) => {
        const responseData = await getServiceso(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información'
            )
        }
        setServices(responseData)
    }

    return{
        servicesU,
        isFetchingU: !servicesU,
        getServicesU
    }
}