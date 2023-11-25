import cuentaService from "../service/cuentaService.js"
import { validacionIngresar, validacionTransferir } from "../validacion/validaciones.js"


class MovimientoController {
    constructor() {
        this.service = cuentaService
    }

    transferir = async (req, res) => {

        try {
            const response = await this.service.transferirPesos(await validacionTransferir.validateAsync(req.body))
            if (response.error) {
                res.status(400).json(response)
            } else {
                res.json(response)
            }
            
        } catch (err) {
            res.status(400).json({
                error: err.details[0].message
            })
        }
        
    }

    ingresarPesos = async (req, res) => {
        try {
            const response = await this.service.ingresarPesos(await validacionIngresar.validateAsync(req.body))
            if (response.error) {
                res.status(400).json(response)
            } else {
                res.json(response)
            }
        } catch (err) {
            res.status(400).json({
                error: err.details[0].message
            })
        }
    }

    comprarDolares = async (req, res) => {
        res.json(await this.service.comprarDolares(req.body))
    }

    obtenerCuenta = async (req, res) => {
        res.json(await this.service.obtenerCuenta(req.body))
    }
}

export default MovimientoController