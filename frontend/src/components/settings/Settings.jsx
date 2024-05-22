import { UserSettings } from "./user/UserSettings";
import { useUserSettings } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings";
import { UpdateUser } from "./user/UpdateUser";
import { ServiceUser } from "./user/ServiceUser";
import { ToHotelSettings } from "./hotel/ToHotelSettings";
import { ToRoomSettings } from "./room/ToRoomSettings"
import { ToEventSettings } from "./event/ToEventSettings"
import { useServiceUser, useServiceHotel } from "../../shared/hooks";
import { useEffect } from "react";

export const Settings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings();
    const { servicesU, isFetchingU, getServicesU } = useServiceUser();
    const { servicesH, isFetchingH, getServicesH } = useServiceHotel();

    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;

    useEffect(() => {
        if (userId) {
            getServicesU(userId);
        }
    }, [userId]);

    if (isFetching || isFetchingU) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            <span className="title-supreme">Settings</span>
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <UserSettings settings={userSettings} saveSettings={saveSettings} />
                        <PasswordSettings />
                    </div>
                    <div className="settings-container">
                        <ServiceUser servicesU={ servicesU || []} getServicesU={getServicesU} />
                    </div>
                </div>
            ) : userSettings && userSettings.role === 'MANAGER_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <UserSettings settings={userSettings} saveSettings={saveSettings} />
                        <PasswordSettings />
                    </div>
                    <div>
                        <UpdateUser />
                    </div>
                    <div className="settings-container">
                        <ToHotelSettings />
                    </div>
                </div>
            ) : userSettings && userSettings.role === 'ADMIN_ROLE' ? (
                <div>
                    <div className="settings-container">
                        <UserSettings settings={userSettings} saveSettings={saveSettings} />
                        <PasswordSettings />
                    </div>
                    <div className="settings-container">
                        <ToHotelSettings />
                        <ToRoomSettings />
                        <ToEventSettings />
                    </div>
                </div>
            ) : (
                <div>No settings available for this role</div>
            )}
        </div>
    );
}