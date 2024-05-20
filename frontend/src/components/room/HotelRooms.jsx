import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomCard } from './RoomCard';

export const HotelRooms = ({ hotelRooms }) => {
  const [roomsArray, setRoomsArray] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredRooms = roomsArray.filter(rooms =>
    rooms.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleNavigateToRoom = (id) => {
    navigate(`/room/${id}`);
    console.log('room id ', id);
  };

  return (
    <div className="channels-container">
      {hotelName && <span className="title-supreme">{hotelName}</span>}
      <div className="buscador-box">
        <input
          type="text"
          name="buscador"
          placeholder="Buscar..."
          className="buscador"
          value={inputValue}
          onChange={handleInputChange}
        />
        <i className="fa-solid fa-magnifying-glass" ></i>
      </div>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((c) => (
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
        ))
      ) : (
        <div className='nono'>No rooms for this name :(</div>
      )}
    </div>
  );
};
