import { ServiceCard } from "../ServiceCard";
import { useState } from "react";

export const ServiceUser = ({ servicesU }) => {

    console.log(servicesU)

    const [inputValue, setInputValue] = useState('');

    const servicesArray = servicesU && servicesU.data ? servicesU.data : [];

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredServices = servicesArray.filter(services =>
        services.service.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="channels-container">
            <span className="title-supreme">Your services</span>
            {filteredServices.length > 0 ? (
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
                <div className='nono'>No events for this name :(</div>
            )}
        </div>
    );
}
