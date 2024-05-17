/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { EventCard } from "./EventCard";

export const Events = ({events}) => {
    const navigate  = useNavigate()

    const handleNavigateToEvent = (id) => {
        navigate(`/event/${id}`)
    }

    return (
        <div className="channels-container">
          <span className="title-supreme">Events</span>
          {events && events.map((c) => (
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