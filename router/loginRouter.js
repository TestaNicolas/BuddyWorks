import express from 'express'
import LoginController from '../controller/loginController.js'

class LoginRouter {

    constructor() {
        this.router = express.Router()
        this.controller = new LoginController()
    }

    start() {

        this.router.post("/signUp", this.controller.registrarUsuario)
        this.router.post("/login", this.controller.login)

        return this.router
    }
}

export default LoginRouter