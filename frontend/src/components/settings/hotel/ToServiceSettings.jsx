import { useNavigate } from "react-router-dom"

export const ToServiceSettings = () => {

    const navigate = useNavigate()

    const toServiceSettings = () => {
        navigate('/serviceSettings')
    }

    return (
        <div className="to-hotel-card" onClick={toServiceSettings}>
            Service settings
        </div>
    )
}