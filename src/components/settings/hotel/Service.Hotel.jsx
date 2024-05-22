import { ServiceCardHotel } from "../ServiceCardHotel";
import { useState, useEffect } from "react";
import { useFactura } from "../../../shared/hooks";

export const ServiceHotel = ({ servicesH }) => {
    const [inputValue, setInputValue] = useState('');
    const [servicesArray, setServicesArray] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        if (servicesH && servicesH.data) {
            setServicesArray(servicesH.data);
            setFilteredServices(servicesH.data);
        }
    }, [servicesH]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const filtered = servicesArray.filter(service =>
            service.service.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredServices(filtered);
    };

    return (
        <div className="channels-container">
            <span className="title-supreme">Your services</span>
            {servicesArray.length === 0 ? (
                <div className='nono'>No services available.</div>
            ) : (
                filteredServices.length > 0 ? (
                    filteredServices.map((c, index) => (
                        <ServiceCardHotel
                            key={c._id}
                            serId={servicesArray[index]._id}
                            service={c.service}
                            hotel={c.hotel}
                            usuario={c.user}
                            reservations={c.reservations}
                            available={c.estado}
                        />
                    ))
                ) : (
                    <div className='nono'>No events for this hotel :(</div>
                )
            )}
        </div>
    );
}