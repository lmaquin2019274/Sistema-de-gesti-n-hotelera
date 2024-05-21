/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { getBadRooms as getHotelRoomsRequest } from "../../services";

export const useBadRooms = () => {
    const [rooms, setRooms] = useState([]);

    const getHotelRooms = async (id) => {
        try {
            const roomsData = await getHotelRoomsRequest(id);
            if (roomsData.error) {
                return;
            }
            let roomsArray = [];
            if (Array.isArray(roomsData.data)) {
                roomsArray = roomsData.data;
            } else if (roomsData.data) {
                roomsArray = [roomsData.data];
            }

            setRooms(roomsArray);
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
