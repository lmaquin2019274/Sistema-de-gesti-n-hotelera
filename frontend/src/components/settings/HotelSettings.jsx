import { UserSettings } from "../user/UserSettings";
import { useUserSettings } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { DeleteHotel } from "./DeleteHotel"
import { RestoreHotel } from "./RestoreHotel";
import { NewHotel } from "./NewHotel";

export const HotelSettings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings()
    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div className="settings-supreme">
            <span className="title-supreme">Hotel settings</span>
            {userSettings && userSettings.role === 'CLIENT_ROLE' ? (
                <div className="settings-container">
                    <UserSettings settings={userSettings} saveSettings={saveSettings} />
                    <PasswordSettings />
                </div>
            ) : (
                <div>
                    <div className="settings-container">
                        <NewHotel />
                    </div>
                    <div className="settings-container">
                        <DeleteHotel/>
                        <RestoreHotel />
                    </div>
                </div>
            )}
        </div>
    )
}