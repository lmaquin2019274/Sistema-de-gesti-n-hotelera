import { useNavigate } from "react-router-dom"

export const ToHotelSettings = () => {

    const navigate = useNavigate()

    const toHotelSettings = () => {
        navigate('/hotelSettings')
    }

    return (
        <div className="to-hotel-card" onClick={toHotelSettings}>
            Hotel settings
        </div>
    )
}