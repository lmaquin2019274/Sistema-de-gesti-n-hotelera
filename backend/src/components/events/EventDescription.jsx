/* eslint-disable react/prop-types */
import { useUserDetails } from "../../shared/hooks";

const ReserveButton = ({ hotelId, getEvents }) => {
    
}

export const EventDescription = ({
    name,
    price,
    hotel,
    capacity,
    description,
    _id
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                    <span>
                        {isLogged && (
                            <ReserveButton
                                className='channel-follow-button'
                                eventId={_id}
                            />
                        )}
                    </span>
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
            </div>
        </div>
    )
}