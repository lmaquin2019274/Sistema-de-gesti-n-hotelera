import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomCard } from './RoomCard';

export const HotelRooms = ({ hotelRooms }) => {
  const [roomsArray, setRoomsArray] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (hotelRooms && hotelRooms.rooms) {
      setRoomsArray(hotelRooms.rooms);
      if (hotelRooms.rooms.length > 0) {
        setHotelName(hotelRooms.rooms[0].hotel);
      } else {
        setHotelName('');
      }
    } else {
      setRoomsArray([]);
      setHotelName('');
    }
  }, [hotelRooms]);

  const handleNavigateToRoom = (id) => {
    navigate(`/room/${id}`);
    console.log('room id ', id);
  };

  return (
    <div className="channels-container">
      {hotelName && <span className="title-supreme">{hotelName}</span>}
      {roomsArray.map((c) => (
        <RoomCard
          key={c.id}
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
