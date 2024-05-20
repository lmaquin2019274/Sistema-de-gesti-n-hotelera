import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HotelDescription } from "./HotelDescription";
import { useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const ImgHotel = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Hotel Image" />
        </div>
    )
}

export const HotelView = ({ getHotels }) => {
    const { isFetching, getHotelsDetails, hotelDetails } = useHotelDetails();

    const { id } = useParams()
    useEffect(() => {
        getHotelsDetails(id)
    }, [])

    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgHotel imgUrl={hotelDetails.data.imgUrl} />
                <div className="channel-description-box2">
                    <HotelDescription
                        hotelId={hotelDetails.data._id}
                        name={hotelDetails.data.name}
                        location={hotelDetails.data.location}
                        category={hotelDetails.data.category}
                        capacity={hotelDetails.data.capacity}
                        comforts={hotelDetails.data.comforts}
                        getHotels={getHotels}
                    />
                    <MapContainer className="map-container" center={hotelDetails.data.coordenadas.split(',').map(coord => parseFloat(coord.trim()))} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            className="tile-layer"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={hotelDetails.data.coordenadas.split(',').map(coord => parseFloat(coord.trim()))} className="marker">
                            <Popup className="popup">{hotelDetails.data.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}