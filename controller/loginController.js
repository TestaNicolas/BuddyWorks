import LoginService from "../service/loginService.js"
import { validacionRegistroLogin } from '../validacion/validaciones.js'

class LoginController {

    constructor() {
        this.service = new LoginService()
    }

    registrarUsuario = async (req, res) => {
        try {
            const response = await this.service.registrarUsuario(await validacionRegistroLogin.validateAsync(req.body))
            if (response.error) {
                res.status(400).json(response)
            } else {
                res.json(response)
            }
        } catch (err) {
            res.status(400).json({error: err.details[0].message})
        }
        
    }
    
    login = async (req, res) => {

        try {
            const response = await this.service.login(await validacionRegistroLogin.validateAsync(req.body))
            if (response.error) {
                res.status(400).json(response)
            } else {
                res.json(response)
            }
            
        } catch (err) {
            res.status(400).json({error: err.details[0].message})
        }
        
    }

    
}

export default LoginController