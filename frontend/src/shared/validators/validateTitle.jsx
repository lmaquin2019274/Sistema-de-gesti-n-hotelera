export const validateTitle = (title) => {
    return title.length >=3 && title.length <=50
}

export const validateTitleMessage = 'El titulo debe tener entre 3 y 50 caracteres'