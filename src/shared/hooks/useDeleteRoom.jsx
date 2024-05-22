import { useState } from "react";
import { deleteRoom as deleteRoomRequest} from '../../services'
import toast from "react-hot-toast";

export const useDeleteRoom = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

    const deleteRoom = async(email, password, id) =>{
        const response = await deleteRoomRequest({
            id,
            email,
            password
        }, token)

        setIsLoading(false)

        toast.success('room eliminado exitosamente');

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }
    }
    return{
        deleteRoom,
        isLoading
    }
}