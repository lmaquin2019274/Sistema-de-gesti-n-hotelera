/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import {  getHotels as getHotelsRequest} from "../../services"


export const useHotels = () => {
    const [ hotels, setHotels ] = useState([]);

    const getHotels = async (isLogged = false) => {
        try {
            const hotelsData = await getHotelsRequest();
            if (hotelsData.error) {
                return toast.error(
                    hotelsData.e?.response?.data || 'Error ocurred when reading hotels'
                );
            }

            setHotels(hotelsData.data)

            console.log(hotelsData.data);
            console.log(hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    return {
        getHotels,
        isFetching: !Boolean(hotels),
        allHotels: hotels
    };
};