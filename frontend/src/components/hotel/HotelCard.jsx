/* eslint-disable react/prop-types */

const imageUrl = 'https://www.msi-viking.com/sca-dev-2023-1-0/img/no_image_available.jpeg'

const HotelAvatar = ({url}) => {
    return(
        <div className="channels-img-container">
            <img src={url ? url : imageUrl} width='100%' height='100%' alt="Default img" />
        </div>
    )
}

export const HotelCard = ({
    name,
    _id,
    location,
    imgUrl,
    capacity,
    navigateToHotelHandler
}) => {
    const handleNavigate = () => {
        navigateToHotelHandler(_id)
    }

    return(
        <div className="channels-card" onClick={handleNavigate}>
            <HotelAvatar url={imgUrl}/>
            <span className="channels-card-title">{name}</span>
            <span className="channels-card-text">{location}</span>
            <span className="channels-card-text">{capacity}</span>
        </div>
    )
}