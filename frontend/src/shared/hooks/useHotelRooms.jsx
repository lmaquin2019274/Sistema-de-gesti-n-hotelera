/* eslint-disable no-extra-boolean-cast */
import { useState } from "react"
import toast from "react-hot-toast"
import { getHotelRooms as getHotelRoomsRequest } from "../../services"
import { useParams } from "react-router-dom";

export const useHotelRooms = () => {
    const [rooms, setRooms] = useState([]);


    const { "*": route } = useParams();
    const id = route.split("/").pop();
    console.log("Hotel ID:", id);

    const getHotelRooms = async (isLogged = false) => {
        try {
            if (id !== 'hotel' && id !== 'room' && id !== 'event') {
                const roomsData = await getHotelRoomsRequest(id);
                console.log(roomsData)
                if (roomsData.error) {
                    return toast.error(
                        roomsData.e?.response?.data || 'Error ocurred when reading rooms'
                    );
                }

                setRooms(roomsData.data)
            }
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