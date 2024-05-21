import { useState } from "react";
import { deleteEvent as deleteEventRequest} from '../../services'
import toast from "react-hot-toast";

export const useDeleteEvent = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const deleteEvent = async(email, password, id) =>{
        const response = await deleteEventRequest({
            id,
            email,
            password
        }, token)

        setIsLoading(false)

        toast.success('event eliminado exitosamente');

        if(response.error){
            console.log('Error:', response.e);
            console.log('Error Response:', response.e.response);
            console.log('Error Data:', response.e.response?.data);
            return toast.error(response.e?.response?.data || 'Ocurrio un error al eliminar event, intentalo de nuevo')
        }
    }
    return{
        deleteEvent,
        isLoading
    }
}