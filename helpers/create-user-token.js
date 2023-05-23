const jwt = require('jsonwebtoken')

const createUserToken = async(user,req, res) => {

    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, "nossosecret") // essa string fortifica o token para evitar vazamento; Utilizar uma string complexa
    //return token
    res.status(200).json({
        message: ' Voce está autenticado',
        token: token,
        userId: user._id,
    })
}

module.exports = createUserToken