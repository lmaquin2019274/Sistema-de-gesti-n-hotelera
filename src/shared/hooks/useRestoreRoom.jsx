import { useState } from "react";
import { restoreRoom as restoreRoomRequest} from '../../services'
import toast from "react-hot-toast";

export const useRestoreRoom = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const restoreRoom = async(email, password, id) =>{
        const response = await restoreRoomRequest({
            id,
            email,
            password
        }, token)

        toast.success('room restaurado exitosamente');

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al restaurar al room, intentalo de nuevo')
        }
    }
    return{
        restoreRoom,
        isLoading
    }
}