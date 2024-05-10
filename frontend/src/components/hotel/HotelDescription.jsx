/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../shared/hooks";

export const RoomsButton = ({ hotelId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem("hotelId", hotelId);
        navigate(`/room/search/${hotelId}`);
    };

    return (
        <button className='channel-follow-button' onClick={handleClick}>
            Rooms
        </button>
    );
};

export const HotelDescription = ({
    name,
    hotelId,
    location,
    category,
    comforts,
    capacity,
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                    <span>
                        <RoomsButton hotelId={hotelId} />
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
    );
};