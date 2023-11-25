import { faker } from '@faker-js/faker/locale/en'
import {crearUsuarioRandom} from "./test/generador/usuario.js"
import { generarAlias, generarCbu } from './service/cuentaService.js';





function crearCuentaRandom() {
    return {
      usuario: crearUsuarioRandom(),
      saldoPesos: faker.finance.amount(),
      saldoDolares: faker.finance.amount(),
      alias: generarAlias(),
      cbu: generarCbu()
    };
  }
  
  function crearMovimientoRandom() {
    return {
      monto: faker.random.number(),
      moneda: "$",
      destinatario: faker.name.findName(),
      descripcion: faker.finance.transactionDescription()
    };
  }
  
export default {
    crearCuentaRandom,
    crearMovimientoRandom
}