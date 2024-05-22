export const validationEmail = (email) => {
    const regex = /\S+@\S+\.\S+/

  return regex.test(email)
}

export const emailValidationMessage = "/n" + 'Este email no sirve'