export const ServiceCard = ({
    service,
    hotel,
    reservations,
    available,
}) => {
    return(
        <div className="channels-card">
            <span className="channels-card-title">{service}</span>
            <span className="channels-card-text">{hotel}</span>
            <span className="channels-card-text">
                {reservations.map(reservation => (
                    <div key={reservation._id}>
                        <span>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</span>
                        <span>End Date: {new Date(reservation.endDate).toLocaleDateString()}</span>
                    </div>
                ))}
            </span>
            <span className="channels-card-title" style={{color: available ? 'green' : 'red'}}>
                {available ? 'On course' : 'Not on course'}
            </span>
        </div>
    )
}
