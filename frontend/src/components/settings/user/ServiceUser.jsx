import { ServiceCard } from "../ServiceCard";
import { useState, useEffect } from "react";

export const ServiceUser = ({ servicesU }) => {
    console.log(servicesU);

    const [inputValue, setInputValue] = useState('');
    const [servicesArray, setServicesArray] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        if (servicesU && servicesU.data) {
            setServicesArray(servicesU.data);
            setFilteredServices(servicesU.data);
        }
    }, [servicesU]);

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
                    filteredServices.map((c) => (
                        <ServiceCard
                            key={c._id}
                            service={c.service}
                            hotel={c.hotel}
                            reservations={c.reservations}
                            available={c.estado}
                        />
                    ))
                ) : (
                    <div className='nono'>No events for this user :(</div>
                )
            )}
        </div>
    );
}
