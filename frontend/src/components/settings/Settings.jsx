import { UserSettings } from "../user/UserSettings";
import { useUserSettings } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./PasswordSettings";

export const Settings = () => {
    const {userSettings, isFetching, saveSettings} = useUserSettings()
    if(isFetching){
        return <LoadingSpinner/>
    }

    return(
        <div className="settings-container">
            <span>Settings</span>
            <UserSettings settings={userSettings} saveSettings={saveSettings}/>
            <PasswordSettings/>
        </div>
    )
}