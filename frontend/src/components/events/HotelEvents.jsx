/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { EventCard } from "./EventCard";

export const HotelEvents = ({hotelEvents}) => {
    const navigate  = useNavigate()

    const handleNavigateToEvent = (id) => {
        navigate(`/event/${id}`)
    }

    const eventsArray = hotelEvents && hotelEvents.events ? hotelEvents.events : [];
    const hotelName = eventsArray.length > 0 ? eventsArray[0].hotel : '';

    return (
        <div className="channels-container">
          {hotelName && <span className="title-supreme">{hotelName}</span>}
          {eventsArray.map((c) => (
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
          ))}
        </div>
      );      
}