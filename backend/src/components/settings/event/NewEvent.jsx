import { useEffect, useState } from 'react'
import { Input } from '../../Input'
import { Textarea } from '../../TextArea'
import {
    validateDescription,
    descriptionValidateMessage,
    validateTitle,
    validateTitleMessage,
    validationAvatarUrl,
    avatarUrlValidationMessage,
    validatePrice,
    validatePriceMessage,
} from '../../../shared/validators'
import { useNewEvent, useHotels } from '../../../shared/hooks'

export const ImgEvent = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Event Image" />
        </div>
    )
}

const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;

export const NewEvent = () => {
    const { newEvent, isLoading } = useNewEvent();
    const { getHotels, allHotels, isFetching } = useHotels();

    useEffect(() => {
        getHotels();
    }, []);

    const [formState, setFormState] = useState({
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        description: {
            value: '',
            isValid: false,
            showError: false
        },
        hotel: {
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
        price: {
            value: '',
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

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateTitle(value)
                break

            case 'description':
                isValid = validateDescription(value)
                break

            case 'hotel':
                isValid = validateTitle(value)
                break

            case 'capacity':
                isValid = validatePrice(value)
                break

            case 'imgUrl':
                isValid = validationAvatarUrl(value)
                break

            case 'price':
                isValid = validatePrice(value)
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


    const selectedHotel = allHotels.find(hotel => hotel._id === hotelId);
    const hotel = selectedHotel ? selectedHotel.name : '';

    const handleNewPost = (event) => {
        event.preventDefault()
        const priceValue = Number(formState.price.value);
        const capacityValue = Number(formState.capacity.value);

        newEvent(
            formState.name.value,
            formState.description.value,
            hotel,
            capacityValue,
            formState.imgUrl.value,
            priceValue
        );

        setFormState({
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            hotel: {
                value: ''
            },
            capacity: {
                value: ''
            },
            imgUrl: {
                value: ''
            },
            price: {
                value: ''
            },
        });
    }

    const isSubmitButtonDisable = isLoading || !formState.name.isValid || !formState.description.isValid || !formState.price.isValid || !formState.capacity.isValid || !formState.imgUrl.isValid

    return (

        <div className='new-hotel-container'>
            <span className='new-hotel-title'>New Event</span>
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
                    <Textarea
                        field='description'
                        placeholder='Description'
                        label='Description'
                        className='hotel-input'
                        value={formState.description.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.description.showError}
                        validationMessage={descriptionValidateMessage}
                    />
                    <br></br>
                </div>
                <div className='post-hotel-box'>
                    <Input
                        field='hotel'
                        placeholder='Segundo Easter Egg LMAOOOO'
                        label='Your hotel'
                        className='hotel-input'
                        value={hotel}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        disabled={true}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.hotel.showError}
                        validationMessage={validateTitleMessage}
                    />
                    <br></br>
                </div>
                <div className='hotel-input-text-box'>
                    <Input
                        field='price'
                        placeholder='Price'
                        label='Price'
                        className='hotel-text'
                        value={formState.price.value}
                        onChangeHandler={handleInputValueChange}
                        type='number'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.price.showError}
                        validationMessage={validatePriceMessage}
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
                        type='number'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.capacity.showError}
                        validationMessage={validatePriceMessage}
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
                    <ImgEvent className='hotel-new-img' imgUrl={formState.imgUrl.value} />
                    <br></br>
                </div>
                <button className='new-hotel-btn' onClick={handleNewPost} disabled={isSubmitButtonDisable}>
                    Create
                </button>
            </form>
        </div>
    )
}