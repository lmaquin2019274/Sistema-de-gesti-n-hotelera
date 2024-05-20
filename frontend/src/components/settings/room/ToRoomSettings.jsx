import { useNavigate } from "react-router-dom"

export const ToRoomSettings = () => {

    const navigate = useNavigate()

    const toHotelSettings = () => {
        navigate('/roomSettings')
    }

    return (
        <div className="to-hotel-card" onClick={toHotelSettings}>
            Room settings
        </div>
    )
}