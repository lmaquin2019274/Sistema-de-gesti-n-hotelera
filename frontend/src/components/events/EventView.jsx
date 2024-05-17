import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventDescription } from "./EventDescription";
import { useEventsDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const ImgEvent = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Event Image" />
        </div>
    )
}

export const EventView = ({ getEvents }) => {
    const { isFetching, getEventDetails, eventDetails } = useEventsDetails();

    const { id } = useParams()
    useEffect(() => {
        getEventDetails(id)
    }, [])

    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgEvent imgUrl={eventDetails.data.imgUrl} />
                <div className="channel-description-box2">
                    <EventDescription
                        eventId={eventDetails.data.id}
                        name={eventDetails.data.name}
                        hotel={eventDetails.data.hotel}
                        description={eventDetails.data.description}
                        price={eventDetails.data.price}
                        capacity={eventDetails.data.capacity}
                        getEvents={getEvents}
                    />
                </div>
            </div>
        </div>
    )
}