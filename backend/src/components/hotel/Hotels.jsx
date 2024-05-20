/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { HotelCard } from "./HotelCard";
import { useState } from "react";

export const Hotels = ({ hotels }) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');

  const handleNavigateToHotel = (id) => {
    navigate(`/hotel/${id}`)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="channels-container">
      <span className="title-supreme">Hotels</span>
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
      {filteredHotels.length > 0 ? (
        filteredHotels.map((c) => (
          <HotelCard
            key={c.id}
            _id={c._id}
            name={c.name}
            location={c.location}
            category={c.category}
            comforts={c.comforts}
            capacity={c.capacity}
            imgUrl={c.imgUrl}
            navigateToHotelHandler={handleNavigateToHotel}
          />
        ))
      ) : (
        <div className='nono'>No hotels for this name :(</div>
      )}
    </div>
  );
}