/* eslint-disable react/prop-types */
import { useUserDetails } from "../../shared/hooks";

const RoomsButton = ({ hotelId, getHotels, getRooms }) => {

}

export const HotelDescription = ({
    name,
    hotelId,
    location,
    category,
    comforts,
    capacity,
    getHotels,
    getRooms
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                    <span>
                        {isLogged && (
                            <RoomsButton
                                className='channel-follow-button'
                                hotelId={hotelId}
                                getHotels={getHotels}
                                getRooms={getRooms}
                            />
                        )}
                    </span>
                </span>
            </div>
            <div className="channel-description-box">
                <div className="channel-description-item">
                    <span className="channel-description-title2">Location:</span>
                    <span className="channel-description">{location}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Capacity:</span>
                    <span className="channel-description">{capacity}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Category:</span>
                    <span className="channel-description">{category}</span>
                </div>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Comforts:</span>
                    <span className="channel-description">{comforts}</span>
                </div>
            </div>
        </div>
    )
}