/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import {  getRooms as getRoomsRequest} from "../../services"


export const useRooms = () => {
    const [ rooms, setRooms ] = useState([]);

    const getRooms = async (isLogger = false) => {
        try {
            const roomsData = await getRoomsRequest();
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
        getRooms,
        isFetching: !Boolean(rooms),
        allRooms: rooms
    };
};