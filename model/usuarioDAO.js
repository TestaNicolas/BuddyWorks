
import Usuario from "./usuarioModel.js"

class UsuarioDAO {

    constructor() {
    }


    guardarUsuario = async (usuario) => {

        const user = new Usuario(usuario)
        try {
            await user.save()
        } catch (error) {
            console.log(error)
        }
        
        return user
    }

    obtenerUsuario = async (username) => {
        return await Usuario.findOne({username: username})
    }

}

export default UsuarioDAO