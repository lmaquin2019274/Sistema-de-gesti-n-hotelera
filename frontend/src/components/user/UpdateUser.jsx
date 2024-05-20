import { useEffect, useState } from "react";
import {
    validationEmail,
    emailValidationMessage,
    validateRole,
    validateRoleMessage,
    validateId,
    validateIdMessage
} from "../../shared/validators";
import { Input } from "../Input.jsx";
import { Select } from "../Select.jsx"
import { useUpdateSettings, useHotels } from "../../shared/hooks"

export const UpdateUser = () => {
    const { user, isLoading } = useUpdateSettings();

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
        role: {
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
            case 'role':
                isValid = validateRole(value);
                if (value === 'CLIENT_ROLE' || value === 'MANAGER_ROLE') {
                    setFormState(prevState => ({
                        ...prevState,
                        hotel: {
                            value: '',
                            isValid: false,
                            showError: false
                        }
                    }));
                }
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
            user(formState.email.value, formState.role.value, hotel);
        } catch (error) {
            console.error(error);
            toast.error('Error al actualizar el usuario. Por favor, inténtalo de nuevo.');
        }
    }


    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.role.isValid

    const isHotelVisible = formState.role.value !== 'CLIENT_ROLE' && formState.role.value !== 'MANAGER_ROLE';

    return (

        <div className='new-post-container'>
            <span className='new-post-title'>Update user</span>
            <form className='new-post-form'>
                <div className='post-input-text-box'>
                    <Input
                        field='email'
                        placeholder='Email'
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
                    <Select
                        field="role"
                        label="Role"
                        value={formState.role.value}
                        onChangeHandler={handleInputValueChange}
                        options={[
                            { value: '', label: 'Elegir...' },
                            { value: 'CLIENT_ROLE', label: 'Client' },
                            { value: 'ADMIN_ROLE', label: 'Admin' },
                            { value: 'MANAGER_ROLE', label: 'Manager' },
                        ]}
                        className="custom-select-class"
                        showErrorMessage={formState.role.showError}
                        validationMessage={validateRoleMessage}
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <br></br>
                </div>
                {isHotelVisible && (
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
                )}
                <button onClick={handleUpdate} disabled={isSubmitButtonDisable}>
                    Update
                </button>
            </form>
        </div>
    )
}