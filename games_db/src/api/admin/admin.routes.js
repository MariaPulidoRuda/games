const AdminRoutes = require("express").Router();

const { register, login, patchAdmin, deleteAdmin } = require("./admin.controller");

AdminRoutes.post("/register", register); //correcto
AdminRoutes.post("/login", login);
AdminRoutes.patch('/:id', patchAdmin)
AdminRoutes.delete('/:id', deleteAdmin)


module.exports = AdminRoutes;