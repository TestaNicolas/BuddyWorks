import UsuarioDAO from "../model/usuarioDAO.js"
import cuentaService from "./cuentaService.js"
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config.js';
import transporter from '../helpers/mailer.js'

class LoginService {

    constructor() {
        this.usuarioDAO = new UsuarioDAO()
        this.cuentaService = cuentaService
    }

    registrarUsuario = async (usuario) => {
        const usuarioExistente = await this.usuarioDAO.obtenerUsuario(usuario.username)

        if (usuarioExistente) {
            return {error: "Ya existe usuario con ese nombre"}
        }

        usuario.password = await this.encriptarPassword(usuario.password)
        const response = await this.usuarioDAO.guardarUsuario(usuario)
        this.cuentaService.crearCuenta(response)
        this.enviarEmail(usuario)
        return response
    }

    enviarEmail = async (usuario) => {
        await transporter.sendMail({
            from: config.EMAIL,
            to: usuario.email,
            subject: '¡Bienvenido a tu nuevo Banco!',
            text: `¡Hola ${usuario.username}! \n \n Te damos la bienvenida a nuestro banco. Estamos emocionados de tenerte con nosotros. Explora nuestras funciones y descubre cómo funciona nuestra aplicacion. \n ¡Gracias por unirte a nosotros! `
        })
    }

    login = async (loginRequest) => {
        const usuario = await this.usuarioDAO.obtenerUsuario(loginRequest.username)

        if (!usuario) {
            return {error: "Usuario no existente"}
        }

        if (await this.verificarPassword(loginRequest.password, usuario.password)) {
            return {token: this.generateToken(usuario._id)}
        } else {
            return {error: "Credenciales inválidas"}
        }
        
    }

    async encriptarPassword(password) {
        return await bcrypt.hash(password, 10)
    }

    async verificarPassword(password, hash) {
        return await bcrypt.compare(password, hash)
    }

    generateToken(id) {
        return jsonwebtoken.sign({
            data: {
                user: id
            }
        }, "key", {
            expiresIn: 120
        })
    }

    randomNumber(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }
}

export default LoginService