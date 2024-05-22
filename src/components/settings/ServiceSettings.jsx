import { useEffect, useState } from "react";
import { useServiceHotel, useUserSettings } from "../../shared/hooks";
import { ServiceHotel } from "./hotel/Service.Hotel";
import { LoadingSpinner } from "../LoadingSpinner";

export const ServiceSettings = () => {

    const { userSettings, isFetching: isUserFetching, saveSettings } = useUserSettings()
    const { servicesH, isFetchingH, getServicesH } = useServiceHotel();
    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;
    const [executions, setExecutions] = useState(0);


    useEffect(() => {
        if (hotelId && executions < 2) {
            getServicesH(hotelId);
            setExecutions(executions + 1);
        }
    }, [hotelId, executions, getServicesH]);

    if (isUserFetching || isFetchingH) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div className="settings-container">
                    Bro? que haces tú aqui? 🤨
                </div>
            ) : userSettings && userSettings.role === 'MANAGER_ROLE' ? (
                <div>
                    <div className="settings-container">
                        Bro? sabes bien que solo los admin pueden editar servicios 🤨
                    </div>
                </div>
            ) : userSettings && userSettings.role === 'ADMIN_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <ServiceHotel servicesH={servicesH || []} getServicesH={getServicesH} />
                    </div>
                </div>
            ) : (
                <div>No settings available for this role</div>
            )}
        </div>
    )
}