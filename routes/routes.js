var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
const User = require("../models/User");
var AdminAuth = require("../middleware/AdminAuth")


router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user", AdminAuth, UserController.index);
router.get("/user/:id", UserController.findUser);
router.put("/user", UserController.edit);
router.delete("/user/:id", UserController.remove);
router.post("/recoverypassword", UserController.recoveryPassword);
router.post("/changePassword", UserController.changePassword);
router.post("/login", UserController.login);
router.post('/validate',AdminAuth, HomeController.validate)


module.exports = router;