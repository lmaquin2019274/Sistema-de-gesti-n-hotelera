import { useNavigate } from "react-router-dom"

export const ToEventSettings = () => {

    const navigate = useNavigate()

    const toHotelSettings = () => {
        navigate('/eventSettings')
    }

    return (
        <div className="to-hotel-card" onClick={toHotelSettings}>
            Event settings
        </div>
    )
}