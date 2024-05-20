import { UserSettings } from "./user/UserSettings";
import { useUserSettings } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings";
import { UpdateUser } from "./user/UpdateUser";
import { ToHotelSettings } from "./hotel/ToHotelSettings";

export const Settings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings()
    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            <span className="title-supreme">Settings</span>
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div className="settings-container">
                    <UserSettings settings={userSettings} saveSettings={saveSettings} />
                    <PasswordSettings />
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
                    </div>
                </div>
            ) : (
                <div>No settings available for this role</div>
            )}
        </div>
    );
}