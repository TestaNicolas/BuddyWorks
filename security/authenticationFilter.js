import jsonwebtoken from 'jsonwebtoken'


    const verificarToken = (req, res, next) => {

        if (req.headers.authorization) {
            const header = req.headers.authorization
            try {
                const token = jsonwebtoken.verify(header.substring(7), 'key')
                req.body.user = token.data.user
                next()
            } catch (error) {
                res.status(403).json({mensaje: "Token invalido"})
            }
            
        } else {
            res.status(401).end()
        }
    }


export default verificarToken