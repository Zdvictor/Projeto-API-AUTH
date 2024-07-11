class HomeController{

    async index(req, res){
        res.send("SISTEMA DE GESTÃO DE USUÁRIOS");
    };

    async validate(req,res) {
        res.status(200)
        res.send('okay')

    }

}

module.exports = new HomeController();
