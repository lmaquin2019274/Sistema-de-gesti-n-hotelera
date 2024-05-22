import React from 'react';
import { useUserDetails } from "../../shared/hooks";
import ReservationForm from "./ReservationForm";

export const EventDescription = ({
    name,
    price,
    hotel,
    capacity,
    description,
    eventId,
    hotelId
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                </span>
            </div>
            <div className="channel-description-box">
                <div className="channel-description-item">
                    <span className="channel-description-title2">Price:</span>
                    <span className="channel-description">{price}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Hotel:</span>
                    <span className="channel-description">{typeof hotel === 'object' ? hotel.name : hotel}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Capacity:</span>
                    <span className="channel-description">{capacity}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Description:</span>
                    <span className="channel-description">{description}</span>
                </div>
                {isLogged && (
                    <ReservationForm eventId={eventId} hotel={hotelId} />
                )}
            </div>
        </div>
    )
}