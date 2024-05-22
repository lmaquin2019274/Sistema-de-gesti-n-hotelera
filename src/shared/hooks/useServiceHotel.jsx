import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getServiceHotel as getServiceso } from "../../services";

export const useServiceHotel = () => {
    const [servicesH, setServices] = useState();

    useEffect(() => {
        console.log(servicesH);
    }, [servicesH]);

    const getServicesH = async (id) => {
        const responseData = await getServiceso(id);


        if (responseData.error) {
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información de la habitación'
            );
        }

        setServices(responseData);
    };

    return {
        isFetchingH: !servicesH,
        servicesH,
        getServicesH
    };
};
