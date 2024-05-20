import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard'; // Asegúrate de que la ruta sea correcta

export const Events = ({ events }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleNavigateToEvent = (id) => {
    navigate(`/event/${id}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="channels-container">
      <span className="title-supreme">Events</span>
      <div className="buscador-box">
        <input
          type="text"
          name="buscador"
          placeholder="Buscar..."
          className="buscador"
          value={inputValue}
          onChange={handleInputChange}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
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
};
