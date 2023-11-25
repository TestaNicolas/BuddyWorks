import mongoose from "mongoose";
import Cuenta from "./cuentaModel.js";

class CuentaDAO {
    constructor () {

    }

    crearCuenta = async (cuentaRequest) => {
        const cuenta = new Cuenta(cuentaRequest)

        try {
            await cuenta.save()
        } catch (error) {
            console.log(error)
        }
    }

    obtenerCuentaPorUsuario = async (usuario) => {
        return await Cuenta.findOne({usuario: usuario})
    }

    obtenerCuentaPorAlias = async (alias) => {
        return await Cuenta.findOne({alias: alias})
    }

    obtenerCuentaPorCbu = async (cbu) => {
        return await Cuenta.findOne({cbu: cbu})
    }
}

const cuentaDAO = new CuentaDAO()

export default cuentaDAO