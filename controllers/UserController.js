var User = require('../models/User')
var PasswordToken = require("../models/PasswordToken")
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

var secret = 'adwdasdawdasdwadadadwadadadadasadsa'

class UserController {


    async index(req,res) {

       var users = await User.findAll()

       res.json(users)


    }

    async findUser(req,res) {

        var id = req.params.id;

        var user = await User.findById(id);

        if(user == undefined) {

            res.status(404)
            res.json({})

        }else{

            res.status(200)
            res.json(user);


        }

    }



    async create(req,res) {

        var {name,email,password} = req.body


        if(email == undefined || email == '' || email == '  ') {

            res.status(400);

            res.json({err: "O E-mail e Invalido"})

            return;


        }

        var emailExist =  await User.findEmail(email)

        if(emailExist) {

            res.status(406)
            res.json({err: "O E-mail ja esta cadastrado"})

            return

        }

       await User.new(name,email,password)

       res.status(200)
       res.send("Tudo OK!")

    }


    async edit(req,res) {

        var {id,email,name,role} = req.body

        var result = await User.update(id,email,name,role)
        if(result != undefined) {


            if(result.status) {
                res.status(200)
                res.send("Tudo Ok!")

            }else {

                res.status(406)
                res.send(result.err)

            }

        }else {

            res.status(406)
            res.send(result.err)


        }
        

    }

    async remove(req,res) {

        var id = req.params.id

        var result = await User.delete(id)

        if(result.status) {

            res.status(200)
            res.send("Tudo Ok!")

        }else {

            res.status(406)
            res.send(result.err)

        }


    }

    async recoveryPassword(req,res) {

        var email = req.body.email

        var result = await PasswordToken.create(email)

        if(result.status) {

            res.status(200)
            res.send("" + result.token)


        }else {

            res.status(406)
            res.send(result.err)

        }


    }

    async changePassword(req,res) {

        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status) {

            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send("Senha Alterada")

        }else {

            res.status(406)
            res.send("Token Invalido")


        }


    }


    async login(req,res) {

        var {email,password} = req.body

        var user = await User.findByEmail(email)

        if(user != undefined) {

            var result = await bcrypt.compare(password, user.password)

            if(result) {

                var token = jwt.sign({email: user.email, role: user.role}, secret)

                res.status(200)
                res.json({token: token})

            }else {

                res.status(406);
                res.json({err: "Senha Incorreta"})



            }

        }else {

            res.status(406)
            res.json({status: false, err: "O Usuario nao Existe"})


        }


    }


};


module.exports = new UserController();