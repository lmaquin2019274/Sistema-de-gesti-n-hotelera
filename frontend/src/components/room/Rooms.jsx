/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { RoomCard } from "./RoomCard";
import { useState } from "react";

export const Rooms = ({ rooms }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');

  const handleNavigateToRoom = (id) => {
    navigate(`/room/${id}`)
  }

  const roomsArray = rooms && rooms.rooms ? rooms.rooms : [];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredRooms = roomsArray.filter(rooms =>
    rooms.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="channels-container">
      <span className="title-supreme">Rooms</span>
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
}