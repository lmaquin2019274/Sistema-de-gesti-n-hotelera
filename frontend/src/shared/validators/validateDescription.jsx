export const validateDescription = (description) => {
    return description.length >= 5 && description.length <= 200
}

export const descriptionValidateMessage = "/n" + 'La descripcion debe tener entre 5 y 200 caracteres'