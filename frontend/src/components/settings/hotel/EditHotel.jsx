import { useState } from 'react'
import { Input } from '../../Input'
import { Textarea } from '../../TextArea'
import {
    validateDescription,
    descriptionValidateMessage,
    validateTitle,
    validateTitleMessage,
    validationAvatarUrl,
    avatarUrlValidationMessage,
    validateCoo,
    validateCooMessage
} from '../../../shared/validators'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export const ImgHotel = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Hotel Image" />
        </div>
    )
}

const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;

export const EditHotel = ({hotelSettings, saveHotelSettings}) => {

    console.log(hotelSettings.data.coordenadas)

    const [formState, setFormState] = useState({
        name: {
            value: hotelSettings.data.name,
            isValid: validateTitle(hotelSettings.data.name),
            showError: false
        },
        location: {
            value: hotelSettings.data.location,
            isValid: validateTitle(hotelSettings.data.location),
            showError: false
        },
        category: {
            value: hotelSettings.data.category,
            isValid: validateTitle(hotelSettings.data.category),
            showError: false
        },
        comforts: {
            value: hotelSettings.data.comforts,
            isValid: validateDescription(hotelSettings.data.comforts),
            showError: false
        },
        capacity: {
            value: hotelSettings.data.capacity,
            isValid: validateTitle(hotelSettings.data.capacity),
            showError: false
        },
        imgUrl: {
            value: hotelSettings.data.imgUrl,
            isValid: validationAvatarUrl(hotelSettings.data.imgUrl),
            showError: false
        },
        coordenadas: {
            value: hotelSettings.data.coordenadas,
            isValid: validateCoo(hotelSettings.data.coordenadas),
            showError: false
        },
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const [coordinates, setCoordinates] = useState([0, 0]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]); // Actualiza el estado con las nuevas coordenadas
        handleInputValueChange(`${lat}, ${lng}`, 'coordenadas'); // Actualiza el campo de entrada 'Coordenadas'
    };

    function MapClickHandler() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateTitle(value)
                break

            case 'location':
                isValid = validateTitle(value)
                break

            case 'category':
                isValid = validateTitle(value)
                break

            case 'comforts':
                isValid = validateDescription(value)
                break

            case 'capacity':
                isValid = validateTitle(value)
                break

            case 'imgUrl':
                isValid = validationAvatarUrl(value)
                break

            case 'coordenadas':
                isValid = validateCoo(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleEditPost = (event) => {
        event.preventDefault()

        saveHotelSettings(hotelId, formState.name.value, formState.location.value, formState.category.value, 
            formState.comforts.value, formState.capacity.value, formState.imgUrl.value, 
            formState.coordenadas.value)
            
    }

    const isSubmitButtonDisable = !formState.name.isValid || !formState.location.isValid || !formState.category.isValid || !formState.comforts.isValid || !formState.capacity.isValid || !formState.imgUrl.isValid

    return (

        <div className='new-hotel-container'>
            <span className='new-hotel-title'>Update Hotel</span>
            <form className='new-hotel-form'>
                <div className='hotel-input-box'>
                    <Input
                        field='name'
                        placeholder='Name'
                        label='Name'
                        className='hotel-input'
                        value={formState.name.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.name.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <br></br>
                </div>
                <div className='post-hotel-box'>
                    <Input
                        field='location'
                        placeholder='Location'
                        label='Location'
                        className='hotel-input'
                        value={formState.location.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.location.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <br></br>
                </div>
                <div className='hotel-input-box'>
                    <Input
                        field='category'
                        placeholder='Category'
                        label='Category'
                        className='hotel-input'
                        value={formState.category.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.category.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <br></br>
                </div>
                <div className='hotel-input-text-box'>
                    <Textarea
                        field='comforts'
                        placeholder='Comforts'
                        label='Comforts'
                        className='hotel-text'
                        value={formState.comforts.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.comforts.showError}
                        validationMessage={descriptionValidateMessage}
                    />
                    <br></br>
                </div>
                <div className='hotel-input-box'>
                    <Input
                        field='capacity'
                        placeholder='Capacity'
                        label='Capacity'
                        className='hotel-input'
                        value={formState.capacity.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.capacity.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <br></br>
                </div>
                <div className='hotel-input-box'>
                    <Input
                        field='imgUrl'
                        placeholder='Image URL'
                        label='Image URL'
                        className='hotel-input'
                        value={formState.imgUrl.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.imgUrl.showError}
                        validationMessage={avatarUrlValidationMessage}
                    />
                    <ImgHotel className='hotel-new-img' imgUrl={formState.imgUrl.value} />
                    <br></br>
                </div>
                <div className='hotel-input-box'>
                    <Input
                        field='coordenadas'
                        placeholder='Coordinates'
                        label='Coordinates'
                        className='hotel-input'
                        value={formState.coordenadas.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        disabled={true}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.coordenadas.showError}
                        validationMessage={validateCooMessage}
                    />
                    <MapContainer
                        center={formState.coordenadas.value.split(',').map(coord => parseFloat(coord.trim()))}
                        zoom={5}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            className="tile-layer"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler />
                        <Marker
                            position={formState.coordenadas.value.split(',').map(coord => parseFloat(coord.trim()))}
                            className="marker"
                        >
                            <Popup className="popup">tu hotel xd</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <button className='new-hotel-btn' onClick={handleEditPost} disabled={isSubmitButtonDisable}>
                    Update
                </button>
            </form>
        </div>
    )
}