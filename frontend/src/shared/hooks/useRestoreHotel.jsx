import { useState } from "react";
import { restoreHotel as restoreHotelRequest} from '../../services'
import toast from "react-hot-toast";

export const useRestoreHotel = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const restoreHotel = async(id, email, password) =>{
        const response = await restoreHotelRequest({
            id,
            email,
            password
        }, token)

        toast.success('hotel restaurado exitosamente');

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al restaurar al hotel, intentalo de nuevo')
        }
    }
    return{
        restoreHotel,
        isLoading
    }
}