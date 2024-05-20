import { useState } from "react";
import { crateEvent as crateEventRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewEvent = () => {
    const [isLoading, setIsLoading] = useState(false)

    const date = '';
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const newEvent = async (name, description, hotel, capacity, imgUrl, price) => {
        const response = await crateEventRequest({
            name,
            description,
            hotel,
            date,
            capacity,
            imgUrl,
            price
        },token)

        toast.success('evento creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            console.log('Error:', response.e);
            console.log('Error Response:', response.e.response);
            console.log('Error Data:', response.e.response?.data);
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        newEvent,
        isLoading
    }
}