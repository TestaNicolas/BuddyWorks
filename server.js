import express from 'express'
import LoginRouter from './router/loginRouter.js'
import Router from './router/router.js'
import swagger from 'swagger-ui-express'
import swaggerFile from './swagger/openapi.json' assert {type: 'json'}
import mongoose from 'mongoose'

class Server {

    constructor(port, persistencia) {
        this.port = port
        this.persistencia = persistencia

        this.app = express()
        this.server = null
    }

    async start() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use("/docs", swagger.serve, swagger.setup(swaggerFile))

        this.app.use("", new LoginRouter().start())
        this.app.use("", new Router().start())

        if(this.persistencia == 'MONGODB') {
            await mongoose.connect('mongodb://127.0.0.1:27017/banco');
            console.log('Conectado a la base');
        }

        const PORT = this.port
        this.server = this.app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
        this.server.on('error', error => console.log(`Error en servidor: ${error.message}`))

        return this.app
    }

    async stop() {
        if(this.server) {
            this.server.close()
            await mongoose.disconnect()
            this.server = null
        }
    }
}


export default Server