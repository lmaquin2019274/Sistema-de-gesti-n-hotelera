import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomDescription } from "./RoomDescription";
import { useRoomDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const ImgRoom = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Room Image" />
        </div>
    )
}

export const RoomView = ({ getRooms }) => {
    const { isFetching, getRoomsDetails, roomDetails } = useRoomDetails();
    const { id } = useParams();

    useEffect(() => {
        getRoomsDetails(id);
    }, []);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    const handleReserve = () => {
        getRooms();  
    };

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgRoom imgUrl={roomDetails.data.imgUrl} />
                <div className="channel-description-box2">
                    <RoomDescription
                        roomId={roomDetails.data._id}  
                        name={roomDetails.data.name}
                        hotel={roomDetails.data.hotel}
                        available={roomDetails.data.available}
                        price={roomDetails.data.price}
                        capacity={roomDetails.data.capacity}
                        getRooms={getRooms}
                        onReserve={handleReserve} 
                    />
                </div>
            </div>
        </div>
    );
};
