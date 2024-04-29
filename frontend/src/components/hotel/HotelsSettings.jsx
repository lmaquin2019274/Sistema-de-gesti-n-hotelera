/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    validateUsername,
    validateUsernameMessage,
    validateAvatarUrl,
    avatarUrlValidationMessage,
    validateDescription,
    descriptionValidationMessage,
    validateTitle,
    validateTitleMessage,
} from "../../shared/validators";
import { Input } from "../Input.jsx";

const inputs = [
    {
        field: "name",
        label: "Name",
        validationMessage: validateTitleMessage,
        type: "text",
    },
    {
        field: "location",
        label: "Location",
        validationMessage: validateTitleMessage,
        type: "text",
    },
    {
        field: "category",
        label: "Category",
        validationMessage: validateUsernameMessage,
        type: "text",
    },
    {
        field: "capacity",
        label: "Capacity",
        validationMessage: validateUsernameMessage,
        type: "text",
    },
    {
        field: "imgUrl",
        label: "Image Url",
        validationMessage: avatarUrlValidationMessage,
        type: "text",
    },
    {
        field: "comforts",
        label: "Comforts",
        validationMessage: descriptionValidationMessage,
        type: "text",
    },
];
export const HotelSettings = ({ settings, saveSettings }) => {
    const [formState, setFormState] = useState({
        name: {
            isValid: validateTitle(settings.name),
            showError: false,
            value: settings.name,
        },
        location: {
            isValid: validateTitle(settings.location),
            showError: false,
            value: settings.location,
        },
        category: {
            isValid: validateUsername(settings.category),
            showError: false,
            value: settings.category,
        },
        capacity: {
            isValid: validateUsername(settings.capacity),
            showError: false,
            value: settings.capacity,
        },
        imgUrl: {
            isValid: validateAvatarUrl(settings.imgUrl),
            showError: false,
            value: settings.imgUrl,
        },
        comforts: {
            isValid: validateDescription(settings.comforts),
            showError: false,
            value: settings.comforts,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "category":
                isValid = validateUsername(value);
            break;
            case "capacity":
                isValid = validateUsername(value);
            break;
            case "name":
                isValid = validateTitle(value);
            break;
            case "location":
                isValid = validateTitle(value);
            break;
            case "imgUrl":
                isValid = validateAvatarUrl(value);
            break;
            case "comforts":
                isValid = validateDescription(value);
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
    };

    const handleFormSubmit = (event) => {
        event.preventDefault()

        saveSettings({
            name: formState.name.value,
            location: formState.location.value,
            capacity: formState.capacity.value,
            category: formState.category.value,
            comforts: formState.comforts.value,
            imgUrl: formState.imgUrl.value
        })

        console.log(formState)
    }

    const isSubmitButtonDisabled = !formState.name.isValid ||
        !formState.location.isValid ||
        !formState.capacity.isValid ||
        !formState.category.isValid ||
        !formState.imgUrl.isValid ||
        !formState.comforts.isValid

    return (
        <form className="settings-form">
            {inputs.map((input) => (
                <Input
                    key={input.field}
                    field={input.field}
                    label={input.label}
                    value={formState[input.field].value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState[input.field].showError}
                    validationMessage={input.validationMessage}
                    type={input.type}
                    textarea={input.textarea}
                />
            ))}
            <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                Guardar
            </button>
        </form>
    )
};
