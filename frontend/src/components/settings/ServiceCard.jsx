import { useEffect, useState } from 'react';
import { useServiceDetails, useHotelDetails, useUserDetails2 } from "../../shared/hooks";
import { LoadingSpinner } from '../LoadingSpinner';

export const ServiceCard = ({
    service,
    hotel,
    usuario,
    reservations,
    available,
}) => {
    const { serviceDetails, isFetching: fetchserv, getServicesDetails } = useServiceDetails();
    const { hotelDetails, isFetching: fetchhote, getHotelsDetails } = useHotelDetails();
    const { userDetails, isFetching, getUserDetails } = useUserDetails2();
    const [executions, setExecutions] = useState(0);


    useEffect(() => {
        if (executions < 3) {
        getServicesDetails(service);
        getHotelsDetails(hotel);
        getUserDetails(usuario);
        setExecutions(executions + 1);
        }
    }, [executions]);

    if (fetchserv || fetchhote || isFetching) {
        return <LoadingSpinner />;
    }


    return (
        <div className="channels-card">
            <span className="channels-card-title">{serviceDetails.data.name}</span>
            <span className="channels-card-text">{hotelDetails.data.name}</span>
            <span className="channels-card-text">{userDetails.data.email}</span>
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
