import { faker } from '@faker-js/faker';



function crearUsuarioRandom() {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
    };
  }



export default {
    crearUsuarioRandom
}