import { useState } from "react";
import { deleteHotel as deleteHotelRequest} from '../../services'
import toast from "react-hot-toast";

export const useDeleteHotel = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const deleteHotel = async(email, password, id) =>{
        const response = await deleteHotelRequest({
            id,
            email,
            password
        }, token)

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al eliminar hotel, intentalo de nuevo')
        }
    }
    return{
        deleteHotel,
        isLoading
    }
}