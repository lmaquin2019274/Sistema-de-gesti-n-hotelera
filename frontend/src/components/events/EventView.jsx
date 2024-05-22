import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventDescription } from "./EventDescription";
import { useEventsDetails, useHotelName } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const ImgEvent = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Event Image" />
        </div>
    )
}

export const EventView = ({ getEvents }) => {
    const { id } = useParams();
    const { isFetching, getEventDetails, eventDetails } = useEventsDetails();
    const { hotelDetails, isFetchingss, getHotelName } = useHotelName();

    useEffect(() => {
        getEventDetails(id);
    }, [id, getEventDetails]);

    useEffect(() => {
        if (eventDetails?.data?.hotel) {
            getHotelName(eventDetails.data.hotel);
        }
    }, [eventDetails?.data?.hotel, getHotelName]);

    if (isFetching || isFetchingss) {
        return <LoadingSpinner />
    }

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgEvent imgUrl={eventDetails.data.imgUrl} />
                <div className="channel-description-box2">
                    <EventDescription
                        eventId={eventDetails.data._id}
                        name={eventDetails.data.name}
                        hotel={eventDetails.data.hotel}
                        description={eventDetails.data.description}
                        price={eventDetails.data.price}
                        capacity={eventDetails.data.capacity}
                        getEvents={getEvents}
                        hotelId={hotelDetails.data._id}
                    />
                </div>
            </div>
        </div>
    )
}