var knex = require('../database/connection')
var bcrypt = require('bcrypt')





//Models ou Services

class User {


    async findAll() {

        try {

            var result = await knex.select(["id", "name", "email", "role"]).table("users")

            return result



        }catch(err) {

            console.log(err)
            return []


        }
       


    }

    async findById(id) {

        try {

            var result = await knex.select(["id", "name", "email", "role"]).where({id:id}).table("users")

            if(result.length > 0) {

                return result[0]

            }else {

                console.log(err)
                return undefined

            }

        }catch(err) {

            console.log(err)
            return undefined


        }

    }

    async findByEmail(email) {

        try {

            var result = await knex.select(["id", "name", "password", "email", "role"]).where({email:email}).table("users")

            if(result.length > 0) {

                return result[0]

            }else {

                console.log(err)
                return undefined

            }

        }catch(err) {

            console.log(err)
            return undefined


        }

    }

    

    async new(name,email,password) {

        try {
            
            var hash = await bcrypt.hash(password, 10)
            await knex.insert({name,email,password: hash, role:1}).table('users')

        }catch( err ) {

            console.log(err)

        }

        

    }

    async findEmail(email) {

        try {

            var result = await knex.select("*").from("users").where({email: email})

            if(result.length > 0) {

                return true;

            }else {

                return false;

            }

        }catch( err ) {

            console.log(err)

            return false;

        }
        

    }

    async update(id,email,name,role) {

        var user = await this.findById(id);


        if(user != undefined) {

            var editUser = {};

            if(email != undefined){//Verificar Se O Email Informado E Igual Ao Existente

                if(email != user.email) {

                    var result = await this.findEmail(email)

                    if(!result) { //Email Nao Cadastrado

                        editUser.email = email

                    }else {

                        return {status: false, err: "O Email ja Esta Cadastrado"}
                        
                    }

                }

            }

            if(name != undefined) {

                editUser.name = name

            }

            if(role != undefined) {

                editUser.role = role

            }

            try {

                await knex.update(editUser).where({id: id}).table('users')
                return {status: true}


            }catch( err ) {

                return {status: false, err: err}


            }
            

        }else {

            return {status: false, err: "O Usuario Nao Existe!"}


        }


    }


    async delete(id) {

        var user = await this.findById(id)


        if(user != undefined) {

            try {

                await knex.delete('*').where({id: id}).table("users")

                return {status: true}

            }catch(err) {

                return {status: false, err: err}


            }


        }else {

            return {status: false, err: "O Usuario Nao Existe, Portanto Nao Pode Ser Deletado"}


        }


    }


    async changePassword(newPassword,id,token) {

        var hash = await bcrypt.hash(newPassword, 10)

        await knex.update({password: hash}).where({id:id}).table("users");

        setUsed(token)


    }

};


module.exports = new User()
