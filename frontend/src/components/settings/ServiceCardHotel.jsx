import { useEffect, useState } from 'react';
import { useServiceDetails, useHotelDetails, useUserDetails2 } from "../../shared/hooks";
import { LoadingSpinner } from '../LoadingSpinner';
import { useFactura } from './Factura';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ServiceCardHotel = ({
    service,
    hotel,
    usuario,
    reservations,
    available,
    serId,
}) => {
    const { serviceDetails, isFetching: fetchserv, getServicesDetails } = useServiceDetails();
    const { hotelDetails, isFetching: fetchhote, getHotelsDetails } = useHotelDetails();
    const { userDetails, isFetching, getUserDetails } = useUserDetails2();
    const { cf: generateFactura, isLoading: isGeneratingFactura } = useFactura();
    const [executions, setExecutions] = useState(0);
    const [extra, setExtra] = useState('');
    const [extraPrice, setExtraPrice] = useState(0);

    useEffect(() => {
        if (executions < 3) {
            getServicesDetails(service);
            getHotelsDetails(hotel);
            getUserDetails(usuario);
            setExecutions(executions + 1);
        }
    }, [executions]);

    const generatePDF = (serviceDetails, hotelDetails, userDetails, reservations, extra, extraPrice, total) => {
        const doc = new jsPDF();

        doc.text('Factura de Servicio', 10, 10);
        doc.autoTable({
            head: [['Servicio', 'Hotel', 'Usuario', 'Reservaciones', 'Extras', 'Total']],
            body: [
                [
                    serviceDetails.data.name,
                    hotelDetails.data.name,
                    userDetails.data.email,
                    reservations.map(reservation => `${new Date(reservation.startDate).toLocaleDateString()} - ${new Date(reservation.endDate).toLocaleDateString()}`).join(', '),
                    `${extra}: $${extraPrice}`,
                    `$${total}`
                ],
            ],
        });

        doc.save('factura.pdf');
    };

    const handleGenerateFactura = () => {
        const total = parseFloat(serviceDetails.data.price) + parseFloat(extraPrice);
        const serviceId = serviceDetails.data._id;

        generateFactura(serId, extra, total, serviceId)
            .then(() => {
                generatePDF(serviceDetails, hotelDetails, userDetails, reservations, extra, extraPrice, total);
            })
            .catch((error) => {
                console.error("Error generating factura:", error);
            });
    };

    if (fetchserv || fetchhote || isFetching || isGeneratingFactura) {
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

            <input
                type="text"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="Extra"
            />
            <input
                type="number"
                value={extraPrice}
                onChange={(e) => setExtraPrice(e.target.value)}
                placeholder="Extra Price"
            />

            <button onClick={handleGenerateFactura}>Generate Factura</button>
        </div>
    );
}
