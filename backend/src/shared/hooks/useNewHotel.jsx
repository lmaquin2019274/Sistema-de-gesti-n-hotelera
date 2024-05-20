import { useState } from "react";
import { createHotel as createHotelRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewHotel = () => {
    const [isLoading, setIsLoading] = useState(false)

    const newHotel = async (name, location, category, comforts, capacity, imgUrl, coordenadas) => {
        const response = await createHotelRequest({
            name,
            location,
            category,
            comforts,
            capacity,
            imgUrl,
            coordenadas
        })

        toast.success('hotel creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        newHotel,
        isLoading
    }
}