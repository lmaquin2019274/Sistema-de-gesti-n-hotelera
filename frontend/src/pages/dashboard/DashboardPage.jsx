/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useHotels, useUserDetails, useRooms, useHotelRooms, useEvents, useHotelEvents } from "../../shared/hooks";

import "./dashboardPage.css";
import { useParams } from "react-router-dom";

export const DashboardPage = () => {
    const { getHotels, allHotels, isFetching: isHotelsFetching } = useHotels();
    const { getHotelRooms, allHotelRooms, isFetching: isHotelRoomsFetching } = useHotelRooms();
    const { getRooms, allRooms, isFetching: isRoomsFetching } = useRooms();
    const { getEvents, allEvents, isFetching: isEventsFetching } = useEvents();
    const { getHotelEvents, allHotelEvents, isFetching: isHotelEventsFetching } = useHotelEvents();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getHotels(isLogged);
        getRooms(isLogged);
        getHotelRooms(isLogged);
        getEvents(isLogged);
        getHotelEvents(isLogged);
    }, []);

    const { "*": route } = useParams();
    const hotelId = route.split("/").pop();

    useEffect(() => {
        if (hotelId) {
            getHotelRooms(hotelId);
            getHotelEvents(hotelId);
        }
    }, [hotelId]);

    if (isHotelsFetching || isRoomsFetching || isHotelRoomsFetching || isEventsFetching || isHotelEventsFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content
                hotels={allHotels || []} getHotels={getHotels}
                rooms={allRooms || []} getRooms={getRooms}
                hotelRooms={allHotelRooms || []} getHotelRooms={getHotelRooms}
                events={allEvents || []} getEvents={getEvents}
                hotelEvents={allHotelEvents || []} getHotelEvents={getHotelEvents}
            />
        </div>
    );
};

