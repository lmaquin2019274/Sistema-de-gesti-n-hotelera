import React from 'react';
import { useUserDetails } from "../../shared/hooks";
import ReservationForm from "./ReservationForm";

export const RoomDescription = ({
    name,
    price,
    hotel,
    capacity,
    roomId
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
            </div>
            {isLogged && (
                <ReservationForm roomId={roomId} hotel={hotel} />
            )}
        </div>
    );
};
