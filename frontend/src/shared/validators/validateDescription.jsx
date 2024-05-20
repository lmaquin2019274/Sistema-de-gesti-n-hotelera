export const validateDescription = (description) => {
    return description.length >= 5 && description.length <= 2000
}

export const descriptionValidateMessage = "/n" + 'La descripcion debe tener entre 5 y 2000 caracteres'