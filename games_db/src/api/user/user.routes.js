const UserRoutes = require("express").Router();

const { registerUser, loginUser,  } = require("./user.controller");

UserRoutes.post("/register", registerUser); //FUNCIONA
UserRoutes.post("/login", loginUser); //FUNCIONA


module.exports = UserRoutes;