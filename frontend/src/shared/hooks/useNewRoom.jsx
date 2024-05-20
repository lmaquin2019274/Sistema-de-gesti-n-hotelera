import { useState } from "react";
import { crateRoom as crateRoomRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewRoom = () => {
    const [isLoading, setIsLoading] = useState(false)

    const newRoom = async (name, hotel, reservations, capacity, imgUrl, price) => {
        const response = await crateRoomRequest({
            hotel,
            name,
            price,
            capacity,
            reservations,
            imgUrl
        })

        toast.success('room creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        newRoom,
        isLoading
    }
}