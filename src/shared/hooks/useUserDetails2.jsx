import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { getUserSolo } from "../../services"

export const useUserDetails2 = () => {
    const [userDetails, setUserDetails] = useState();

    const getUserDetails = async (id) => {
        const responseData = await getUserSolo(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información'
            )
        }
        setUserDetails(responseData)
    }

    return{
        userDetails,
        isFetching: !userDetails,
        getUserDetails
    }
}