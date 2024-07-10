var jwt = require('jsonwebtoken')
var secret = 'adwdasdawdasdwadadadwadadadadasadsa'

module.exports =  function(req,res, next) {


    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]

        try {

            var decoded = jwt.verify(token, secret)

            if(decoded.role == 1) {

                next()

            }else {

                res.status(403);
                res.send("Voce Nao Tem Autorizacao para acessar essa pagina")
                return

            }

        }catch( err ) {

            res.status(403);
            res.send("Voce Nao Esta Autenticado")
            return
    

        }
        

        

    }else {

        res.status(403);
        res.send("Voce Nao Esta Autenticado")
        return


    }



}