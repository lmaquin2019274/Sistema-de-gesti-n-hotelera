import { useEffect, useState } from "react";
import {
    validationEmail,
    emailValidationMessage,
    validatePassword,
    validatePasswordMessage,
    validateId,
    validateIdMessage
} from "../../../shared/validators/index.js";
import { Input } from "../../Input.jsx";
import { Select } from "../../Select.jsx"
import { useDeleteEvent, useHotelEventsLite } from "../../../shared/hooks/index.js"

export const DeleteEvent = () => {
    const { deleteEvent, isLoading } = useDeleteEvent();

    const { getHotelEvents, allHotelEvents, isFetching } = useHotelEventsLite();

    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;

    useEffect(() => {
        getHotelEvents(hotelId);
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
        event: {
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
            case 'event':
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
            const selectedEvent = allHotelEvents.find(event => event._id === formState.event.value);
            const evento = selectedEvent ? selectedEvent._id : '';
            deleteEvent(formState.email.value, formState.password.value, evento);

            setFormState({
                email: {
                    value: ''
                },
                password: {
                    value: ''
                },
                event: {
                    value: 'Elegir...'
                },
            });
            
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar al event. Por favor, inténtalo de nuevo.');
        }
    }


    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>Delete event</span>
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
                        field="event"
                        label="Event"
                        value={formState.event.value}
                        onChangeHandler={handleInputValueChange}
                        options={[{ value: '', label: 'Elegir...' }, ...allHotelEvents.map(event => ({ value: event._id, label: event.name }))]}
                        className="custom-select-class"
                        showErrorMessage={formState.event.showError}
                        validationMessage={validateIdMessage}
                        onBlurHandler={handleInputValidationOnBlur}
                        disabled={!allHotelEvents.length}
                    />
                    {isLoading && <div>Cargando events...</div>}
                    <br></br>
                </div>
                <button onClick={handleUpdate} disabled={isSubmitButtonDisable}>
                    Delete
                </button>
            </form>
        </div>
    )
}