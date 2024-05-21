// Rooms.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../services/api"; 
import { RoomCard } from "./RoomCard";

export const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const fetchRooms = async () => {
        try {
            const response = await getRooms();
            if (!response.error) {
                setRooms(response.data.rooms);
            }
        } catch (error) {
            console.error("Error al obtener las habitaciones:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleNavigateToRoom = (id) => {
        navigate(`/room/${id}`);
    };

    return (
        <div className="channels-container">
            <span className="title-supreme">Rooms</span>
            {rooms.map((c) => (
                <RoomCard
                    key={c._id}
                    _id={c._id}
                    name={c.name}
                    available={c.available}
                    price={c.price}
                    hotel={c.hotel}
                    capacity={c.capacity}
                    imgUrl={c.imgUrl}
                    navigateToRoomHandler={handleNavigateToRoom}
                />
            ))}
        </div>
    );
};
