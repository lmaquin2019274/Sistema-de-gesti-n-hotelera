/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { HotelCard } from "./HotelCard";

export const Hotels = ({ hotels }) => {
  const navigate = useNavigate()

  const handleNavigateToHotel = (id) => {
    navigate(`/hotel/${id}`)
  }


  return (
    <div className="channels-container">
      <span className="title-supreme">Hotels</span>
      {hotels && hotels.map((c) => (
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
      ))}
    </div>
  );
}