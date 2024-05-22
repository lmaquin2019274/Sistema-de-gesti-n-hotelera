import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNewService } from "../../shared/hooks";
import toast from "react-hot-toast";

const ReservationForm = ({ roomId, hotel }) => {
    const { newService, isLoading } = useNewService();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const handleReserve = async () => {
        if (!startDate || !endDate) {
            return toast.error("Please select both start and end dates");
        }

        const reservations = [
            {
                startDate,
                endDate
            }
        ];

        await newService(roomId, hotel, user, reservations);
    };

    return (
        <div className="reservation-form">
            <h3>Reserve Now</h3>
            <div>
                <label>Start Date</label>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                />
            </div>
            <div>
                <label>End Date</label>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
            <button onClick={handleReserve} disabled={isLoading} className='channel-follow-button'>
                {isLoading ? 'Reserving...' : 'Reserve'}
            </button>
        </div>
    );
};

export default ReservationForm;