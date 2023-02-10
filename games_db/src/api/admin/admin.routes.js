const AdminRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');

const { register, login, patchAdmin, deleteAdmin } = require('./admin.controller');

AdminRoutes.post('/register', register);
AdminRoutes.post('/login', login);
AdminRoutes.patch('/:id', [isAuth], patchAdmin);
AdminRoutes.delete('/:id', [isAuth], deleteAdmin);

module.exports = AdminRoutes;
