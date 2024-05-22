import { useEffect, useState } from 'react';
import { useServiceDetails, useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from '../LoadingSpinner';

export const ServiceCard = ({
    service,
    hotel,
    reservations,
    available,
}) => {
    const { serviceDetails, isFetching: fetchserv, getServicesDetails } = useServiceDetails();
    const { hotelDetails, isFetching: fetchhote, getHotelsDetails } = useHotelDetails();

    useEffect(() => {
        getServicesDetails(service)
        getHotelsDetails(hotel);
    }, []);

    if (fetchserv || fetchhote) {
        return <LoadingSpinner />;
    }

    console.log(serviceDetails)
    console.log(hotelDetails)

    return (
        <div className="channels-card">
            <span className="channels-card-title">{serviceDetails.data.name}</span>
            <span className="channels-card-text">{hotelDetails.data.name}</span>
            <span className="channels-card-text">
                {reservations.map(reservation => (
                    <div key={reservation._id}>
                        <span>Start Date: {reservation.startDate ? new Date(reservation.startDate).toLocaleDateString() : 'N/A'}</span>
                        <span>End Date: {reservation.endDate ? new Date(reservation.endDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                ))}
            </span>
            <span className="channels-card-title" style={{ color: available ? 'green' : 'red' }}>
                {available ? 'On course' : 'Not on course'}
            </span>
        </div>
    )
}
