/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { EventCard } from "./EventCard";
import { useState } from "react";

export const HotelEvents = ({ hotelEvents }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');

  const handleNavigateToEvent = (id) => {
    navigate(`/event/${id}`)
  }

  const eventsArray = hotelEvents && hotelEvents.events ? hotelEvents.events : [];
  const hotelName = eventsArray.length > 0 ? eventsArray[0].hotel : '';

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredEvents = eventsArray.filter(event =>
    event.name.toLowerCase().includes(inputValue.toLowerCase())
  );

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
      {filteredEvents.length > 0 ? (
        filteredEvents.map((c) => (
          <EventCard
            key={c.id}
            _id={c._id}
            name={c.name}
            description={c.description}
            price={c.price}
            hotel={c.hotel}
            capacity={c.capacity}
            imgUrl={c.imgUrl}
            navigateToEventHandler={handleNavigateToEvent}
          />
        ))
      ) : (
        <div className='nono'>No events for this name :(</div>
      )}
    </div>
  );
}