/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useHotels, useUserDetails, useRooms, useHotelRooms } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {
    const { getHotels, allHotels, isFetching: isHotelsFetching } = useHotels();
    const { getHotelRooms, allHotelRooms, isFetching: isHotelRoomsFetching } = useHotelRooms();
    const { getRooms, allRooms, isFetching: isRoomsFetching } = useRooms();
    const { isLogged } = useUserDetails();
    const { "*": route } = useParams();
    const hotelId = route.split("/").pop();
    console.log("Hotel ID:", hotelId);

    useEffect(() => {
        getHotels(isLogged);
        getRooms(isLogged);
        if (hotelId !== undefined) {
            getHotelRooms(isLogged, hotelId);
        }
    }, [hotelId]);

    if (isHotelsFetching || isRoomsFetching || isHotelRoomsFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content hotels={allHotels || []} getHotels={getHotels} rooms={allRooms || []} getRooms={getRooms} hotelRooms={allHotelRooms || []} getHotelRooms={getHotelRooms} />
        </div>
    );
};

