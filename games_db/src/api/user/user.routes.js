const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');

const { registerUser, loginUser, patchUser, deleteUser } = require('./user.controller');

UserRoutes.post('/register', registerUser); 
UserRoutes.post('/login', loginUser); 
UserRoutes.patch('/:id', [isAuth], patchUser);
UserRoutes.delete('/:id', [isAuth], deleteUser);

module.exports = UserRoutes;
