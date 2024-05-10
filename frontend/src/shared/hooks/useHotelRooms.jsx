/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import {  getHotelRooms as getHotelRoomsRequest} from "../../services"


export const useHotelRooms = () => {
    const [ rooms, setRooms ] = useState([]);

    const getHotelRooms = async (isLogger = false, id) => {
        try {
            const roomsData = await getHotelRoomsRequest(id);
            console.log(roomsData)
            if (roomsData.error) {
                return toast.error(
                    roomsData.e?.response?.data || 'Error ocurred when reading rooms'
                );
            }

            setRooms(roomsData.data)
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    return {
        getHotelRooms,
        isFetching: !Boolean(rooms),
        allHotelRooms: rooms
    };
};