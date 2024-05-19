import { useEffect, useState } from "react";
import {
    validationEmail,
    emailValidationMessage,
    validatePassword,
    validatePasswordMessage,
    validateId,
    validateIdMessage
} from "../../shared/validators";
import { Input } from "../Input.jsx";
import { Select } from "../Select.jsx"
import { useDeleteHotel, useHotels } from "../../shared/hooks"

export const DeleteHotel = () => {
    const { deleteHotel, isLoading } = useDeleteHotel();

    const { getHotels, allHotels, isFetching } = useHotels();

    useEffect(() => {
        getHotels();
    }, []);

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        hotel: {
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
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validationEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'hotel':
                isValid = validateId(value);
                break;
            default:
                break;
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

    const handleUpdate = (event) => {
        try {
            event.preventDefault();
            const selectedHotel = allHotels.find(hotel => hotel._id === formState.hotel.value);
            const hotel = selectedHotel ? selectedHotel._id : '';
            deleteHotel(formState.email.value, formState.password.value, hotel);
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar al hotel. Por favor, inténtalo de nuevo.');
        }
    }


    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>Delete hotel</span>
            <form className='new-post-form'>
                <div className='post-input-text-box'>
                    <Input
                        field='email'
                        placeholder='Your email'
                        label='User'
                        className='post-input'
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.email.showError}
                        validationMessage={emailValidationMessage}
                    />
                    <br></br>
                </div>
                <div className='post-input-text-box'>
                    <Input
                        field='password'
                        placeholder='Your password'
                        label='Password'
                        className='post-input'
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.password.showError}
                        validationMessage={validatePasswordMessage}
                    />
                    <br></br>
                </div>
                <div className='post-input-text-box'>
                    <Select
                        field="hotel"
                        label="Hotel"
                        value={formState.hotel.value}
                        onChangeHandler={handleInputValueChange}
                        options={[{ value: '', label: 'Elegir...' }, ...allHotels.map(hotel => ({ value: hotel._id, label: hotel.name }))]}
                        className="custom-select-class"
                        showErrorMessage={formState.hotel.showError}
                        validationMessage={validateIdMessage}
                        onBlurHandler={handleInputValidationOnBlur}
                        disabled={!allHotels.length}
                    />
                    {isLoading && <div>Cargando hoteles...</div>}
                    <br></br>
                </div>
                <button onClick={handleUpdate} disabled={isSubmitButtonDisable}>
                    Delete
                </button>
            </form>
        </div>
    )
}