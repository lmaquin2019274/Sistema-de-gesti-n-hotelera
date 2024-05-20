import { useState } from "react";
import { crateRoom as crateRoomRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const newRoom = async (name, hotel, capacity, imgUrl, price) => {
        const response = await crateRoomRequest({
            hotel,
            name,
            price,
            capacity,
            imgUrl
        }, token)

        toast.success('room creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            console.log('Error:', response.e);
            console.log('Error Response:', response.e.response);
            console.log('Error Data:', response.e.response?.data);
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        newRoom,
        isLoading
    }
}