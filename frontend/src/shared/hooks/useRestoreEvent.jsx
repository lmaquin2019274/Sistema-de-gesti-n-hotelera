import { useState } from "react";
import { restoreEvent as restoreEventRequest} from '../../services'
import toast from "react-hot-toast";

export const useRestoreEvent = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const restoreEvent = async(email, password, id) =>{
        const response = await restoreEventRequest({
            id,
            email,
            password
        }, token)

        toast.success('event restaurado exitosamente');

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al restaurar al event, intentalo de nuevo')
        }
    }
    return{
        restoreEvent,
        isLoading
    }
}