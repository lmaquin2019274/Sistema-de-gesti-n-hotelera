import { useUserSettings, useEditHotel, useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { DeleteHotel } from "./hotel/DeleteHotel"
import { RestoreHotel } from "./hotel/RestoreHotel";
import { NewHotel } from "./hotel/NewHotel";
import { EditHotel } from "./hotel/EditHotel";
import { useEffect, useState } from "react";

export const HotelSettings = () => {
    const { userSettings, isFetching: isUserFetching, saveSettings } = useUserSettings()
    const { editHotel, isLoading } = useEditHotel()
    const { hotelDetails, isFetching: isHotelFetching, getHotelsDetails } = useHotelDetails()
    const [loading, setLoading] = useState(true);

    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;
    useEffect(() => {
        if (hotelId) {
            getHotelsDetails(hotelId)
                .then(() => setLoading(false)) // Cuando la carga esté completa, cambiar el estado de carga a falso
                .catch((error) => {
                    console.error(error);
                    setLoading(false); // En caso de error, también cambiar el estado de carga a falso
                });
        }
    }, [hotelId]);

    if (isHotelFetching || loading) {
        return <LoadingSpinner />;
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
                        <NewHotel />
                    </div>
                    <div className="settings-container">
                        <DeleteHotel/>
                        <RestoreHotel />
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