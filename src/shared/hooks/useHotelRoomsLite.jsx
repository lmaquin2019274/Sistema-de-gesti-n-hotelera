/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { getHotelRooms as getHotelRoomsRequest } from "../../services";

export const useHotelRoomsLite = () => {
    const [rooms, setRooms] = useState([]);

    const getHotelRooms = async (id) => {
        try {
            const roomsData = await getHotelRoomsRequest(id);
            if (roomsData.error) {
                return;
            }
            setRooms(roomsData.data.rooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    return {
        getHotelRooms,
        isFetching: !Boolean(rooms.length),
        allHotelRooms: rooms
    };
};
