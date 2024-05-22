import { useState } from "react";
import { editHotel as editHotelRequest } from '../../services'
import toast from "react-hot-toast";

export const useEditHotel = () => {
    const [isLoading, setIsLoading] = useState(false)

    const editHotel = async (id, name, location, category, comforts, capacity, imgUrl, coordenadas) => {
        
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const response = await editHotelRequest({
            id,
            name,
            location,
            category,
            comforts,
            capacity,
            imgUrl,
            coordenadas
        }, token)

        toast.success('hotel creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        editHotel,
        isLoading
    }
}