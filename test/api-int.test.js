import { expect } from "chai";
import supertest from "supertest";
import generador from './generador/usuario.js';
import Server from "../server.js";
import LoginService from "../service/loginService.js"; // Reemplaza con la ruta correcta
import CuentaDao from "../model/cuentaDAO.js";
import { faker } from '@faker-js/faker';



describe('POST', () => {
    
   

    it('debería registrar un usuario con contraseña encriptada', async () => {
        const server = new Server(8081,'MONGODB')
        await server.start()
        const request = supertest(server.app);
        const loginService = new LoginService();

        const usuario = generador.crearUsuarioRandom();
        const passwordOriginal = usuario.password; 

        console.log('Contraseña original:', passwordOriginal);

        const response = await request.post('/signUp').send(usuario);
        expect(response.status).to.eql(200);

        const usuarioGuardado = response.body;
        expect(usuarioGuardado).to.include.keys('username', 'password');

        console.log('Contraseña almacenada en BD:', usuarioGuardado.password);

       
        const passwordMatches = await loginService.verificarPassword(passwordOriginal, usuarioGuardado.password);
        console.log('¿Las contraseñas coinciden?', passwordMatches);
        expect(passwordMatches).to.eql(true);

        await server.stop()
    });

  

})

describe('Ingreso de dinero', () => {

       

    it('debería aumentar el saldo al ingresar dinero', async () => {
      const server = new Server(8081,'MONGODB')
      await server.start()
      const request = supertest(server.app);
    
      const usuario = generador.crearUsuarioRandom();

      const usuarioCopy = {...usuario}

      const loginService = new LoginService();
  
      const usuarioResponse = await loginService.registrarUsuario(usuario);

      const  { token }  = await loginService.login(usuarioCopy);

      const response = await request.post('/ingresar').set("Authorization", `Bearer ${token}`).send({
        monto: faker.finance.amount()
      }); 

      const cuenta = await CuentaDao.obtenerCuentaPorUsuario(usuarioResponse._id)

      expect(cuenta.saldoPesos).to.greaterThan(0);

      await server.stop();
    });
  });