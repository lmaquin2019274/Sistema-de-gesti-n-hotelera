import { useUserSettings, useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { NewEvent } from "./event/NewEvent";
import { useEffect } from "react";

export const EventSettings = () => {
    const { userSettings, isFetching: isUserFetching, saveSettings } = useUserSettings()
    const { hotelDetails, isFetching: isHotelFetching, getHotelsDetails } = useHotelDetails()

    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;
    useEffect(() => {
        if (hotelId) {
            getHotelsDetails(hotelId);
            if (isHotelFetching) {
                return <LoadingSpinner />
            }
        }
    }, [hotelId]);

    if (isUserFetching) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            <span className="title-supreme">Event settings</span>
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div className="settings-container">
                    Bro? que haces tú aqui? 🤨
                </div>
            ) : userSettings && userSettings.role === 'MANAGER_ROLE' ? (
                <div>
                    <div className="settings-container">
                        Bro? sabes bien que solo los admin pueden editar eventos 🤨
                    </div>
                </div>
            ) : userSettings && userSettings.role === 'ADMIN_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <NewEvent/>
                    </div>
                </div>
            ) : (
                <div>No settings available for this role</div>
            )}
        </div>
    )
}