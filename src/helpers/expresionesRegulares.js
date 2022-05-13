export const expresiones = {
    correo:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{3,}@[a-z]{3,}[.]{1}[a-z]{3,}$/,
    nombre:/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    contraseña:/.{8,}/,
    telefono:/\d{10}/
}