/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { check, validationResult } from "express-validator";
import toast from "react-hot-toast";
import { getHotelRooms as getHotelRoomsRequest } from "../../services";
import { useParams } from "react-router-dom";

export const useHotelRooms = () => {
    const [rooms, setRooms] = useState([]);
    const { "*": route } = useParams();
    const id = route.split("/").pop();

    const validateMongoId = async (id) => {
        await check('id', 'Invalid hotel ID').isMongoId().run({ params: { id } });
        const result = validationResult({ params: { id } });
        if (!result.isEmpty()) {
            return { valid: false, errors: result.array() };
        }
        return { valid: true, errors: [] };
    };

    const getHotelRooms = async (isLogged = false) => {
        try {
            if (id !== 'hotel' && id !== 'room' && id !== 'event') {
                const { valid, errors } = await validateMongoId(id);
                if (!valid) {
                    return toast.error(errors[0].msg);
                }

                const roomsData = await getHotelRoomsRequest(id);
                if (roomsData.error) {
                    return;
                }

                setRooms(roomsData.data);
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
