import { useState } from 'react'
import { Input } from '../Input'
import { Textarea } from '../TextArea'
import {
    validateDescription,
    descriptionValidateMessage,
    validateTitle,
    validateTitleMessage,
    validationAvatarUrl,
    avatarUrlValidationMessage,
    validateCoo,
    validateCooMessage
} from '../../shared/validators'
import { useNewHotel } from '../../shared/hooks'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export const ImgHotel = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Hotel Image" />
        </div>
    )
}

export const NewHotel = () => {
    const { newHotel, isLoading } = useNewHotel();

    const [formState, setFormState] = useState({
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        location: {
            value: '',
            isValid: false,
            showError: false
        },
        category: {
            value: '',
            isValid: false,
            showError: false
        },
        comforts: {
            value: '',
            isValid: false,
            showError: false
        },
        capacity: {
            value: '',
            isValid: false,
            showError: false
        },
        imgUrl: {
            value: '',
            isValid: false,
            showError: false
        },
        coordenadas: {
            value: '0, 0',
            isValid: false,
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

    const handleNewPost = (event) => {
        event.preventDefault()

        newHotel(formState.name.value, formState.location.value, formState.category.value, formState.comforts.value, formState.capacity.value, formState.imgUrl.value, formState.coordenadas.value)

        setFormState({
            name: {
                value: ''
            },
            location: {
                value: ''
            },
            category: {
                value: ''
            },
            comforts: {
                value: ''
            },
            capacity: {
                value: ''
            },
            imgUrl: {
                value: ''
            },
            coordenadas: {
                value: '0, 0'
            },
        });
    }

    const isSubmitButtonDisable = isLoading || !formState.name.isValid || !formState.location.isValid || !formState.category.isValid || !formState.comforts.isValid || !formState.capacity.isValid || !formState.imgUrl.isValid

    return (

        <div className='new-hotel-container'>
            <span className='new-hotel-title'>New Hotel</span>
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
                        center={[0, 0]}
                        zoom={1}
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
                <button className='new-hotel-btn' onClick={handleNewPost} disabled={isSubmitButtonDisable}>
                    Create
                </button>
            </form>
        </div>
    )
}