/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import {  getBadHotels as getBadHotelsRequest} from "../../services"


export const useBadHotels = () => {
    const [ hotels, setHotels ] = useState([]);

    const getBadHotels = async (isLogged = false) => {
        try {
            const hotelsData = await getBadHotelsRequest();
            if (hotelsData.error) {
                return toast.error(
                    hotelsData.e?.response?.data || 'Error ocurred when reading hotels'
                );
            }

            setHotels(hotelsData.data)

            console.log(hotelsData.data);
            console.log('hotels: ',hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    return {
        getBadHotels,
        isFetching: !Boolean(hotels),
        allHotels: hotels
    };
};