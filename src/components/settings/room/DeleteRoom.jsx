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
import { useDeleteRoom, useHotelRoomsLite } from "../../../shared/hooks/index.js"

export const DeleteRoom = () => {
    const { deleteRoom, isLoading } = useDeleteRoom();

    const { getHotelRooms, allHotelRooms, isFetching } = useHotelRoomsLite();

    const hotelId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).hotel : null;

    console.log(hotelId)

    useEffect(() => {
        getHotelRooms(hotelId);
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
        room: {
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
            case 'room':
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
            const selectedRoom = allHotelRooms.find(room => room._id === formState.room.value);
            const room = selectedRoom ? selectedRoom._id : '';
            deleteRoom(formState.email.value, formState.password.value, room);

            setFormState({
                email: {
                    value: ''
                },
                password: {
                    value: ''
                },
                room: {
                    value: 'Elegir...'
                },
            });
            
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar al room. Por favor, inténtalo de nuevo.');
        }
    }


    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>Delete room</span>
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
                        field="room"
                        label="Room"
                        value={formState.room.value}
                        onChangeHandler={handleInputValueChange}
                        options={[{ value: '', label: 'Elegir...' }, ...allHotelRooms.map(room => ({ value: room._id, label: room.name }))]}
                        className="custom-select-class"
                        showErrorMessage={formState.room.showError}
                        validationMessage={validateIdMessage}
                        onBlurHandler={handleInputValidationOnBlur}
                        disabled={!allHotelRooms.length}
                    />
                    {isLoading && <div>Cargando rooms...</div>}
                    <br></br>
                </div>
                <button onClick={handleUpdate} disabled={isSubmitButtonDisable}>
                    Delete
                </button>
            </form>
        </div>
    )
}