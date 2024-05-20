import React from 'react';

/* eslint-disable react/prop-types */

const imageUrl = 'https://www.msi-viking.com/sca-dev-2023-1-0/img/no_image_available.jpeg';

const EventAvatar = ({ url }) => {
  return (
    <div className="channels-img-container">
      <img src={url ? url : imageUrl} width='100%' height='100%' alt="Default img" />
    </div>
  );
};

export const EventCard = ({
  name,
  _id,
  price,
  imgUrl,
  hotel,
  navigateToEventHandler
}) => {
  const handleNavigate = () => {
    navigateToEventHandler(_id);
  };

  return (
    <div className="channels-card" onClick={handleNavigate}>
      <EventAvatar url={imgUrl} />
      <span className="channels-card-title">{name}</span>
      <span className="channels-card-text"> $ {price}</span>
      <span className="channels-card-text">{typeof hotel === 'object' ? hotel.name : hotel}</span>
    </div>
  );
};

export default EventCard;