import { useState } from "react";
import { crateService as crateServiceRequest } from '../../services'
import toast from "react-hot-toast";

export const useNewService = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const newService = async (service, hotel, user, reservations) => {
        const response = await crateServiceRequest({
            service,
            hotel,
            user,
            reservations
        },token)

        toast.success('service creado exitosamente');

        setIsLoading(false)

        if (response.error) {
            console.log('Error:', response.e);
            console.log('Error Response:', response.e.response);
            console.log('Error Data:', response.e.response?.data);
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return {
        newService,
        isLoading
    }
}