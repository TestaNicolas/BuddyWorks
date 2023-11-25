import Joi from 'joi'

const jwt = Joi.object({
    user: Joi.string().required()
})

export const validacionRegistroLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email()
})

export const validacionLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const validacionTransferir = jwt.append({
    monto: Joi.number().positive().required(),
    alias: Joi.string().max(20),
    cbu: Joi.string().length(22)
}).xor('alias', 'cbu')

export const validacionIngresar = jwt.append({
    monto: Joi.number().positive().required(),
    descripcion: Joi.string().max(120)
})


