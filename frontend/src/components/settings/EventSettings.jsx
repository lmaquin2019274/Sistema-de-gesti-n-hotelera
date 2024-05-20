import { useUserSettings, useEditHotel, useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { EditHotel } from "./hotel/EditHotel";
import { useEffect } from "react";

export const HotelSettings = () => {
    const { userSettings, isFetching: isUserFetching, saveSettings } = useUserSettings()
    const { editHotel, isLoading } = useEditHotel()
    const { hotelDetails, isFetching: isHotelFetching, getHotelsDetails } = useHotelDetails()

    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;
    useEffect(() => {
        if (hotelId) {
            getHotelsDetails(hotelId);
        }
    }, [hotelId]);

    if (isUserFetching || isHotelFetching || isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            <span className="title-supreme">Hotel settings</span>
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div className="settings-container">
                    Bro? que haces tú aqui? 🤨
                </div>
            ) : userSettings && userSettings.role === 'MANAGER_ROLE' ? (
                <div>
                    <div className="settings-container">
                        Bro? sabes bien que solo los admin pueden 🤨
                    </div>
                </div>
            ) : userSettings && userSettings.role === 'ADMIN_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <EditHotel hotelSettings={hotelDetails} saveHotelSettings={editHotel} />
                    </div>
                </div>
            ) : (
                <div>No settings available for this role</div>
            )}
        </div>
    )
}