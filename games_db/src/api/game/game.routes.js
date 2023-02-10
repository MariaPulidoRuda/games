const GamesRoutes = require('express').Router();
const upload = require('../../middlewares/file');
const { isAuth } = require('../../middlewares/auth.middleware');

const {
  postGame,
  getGames,
  getGame,
  patchGame,
  deleteGame,
} = require('./game.controller');

GamesRoutes.post('/register', upload.single('image'), [isAuth], postGame);
GamesRoutes.get('/', getGames);
GamesRoutes.get('/:id', getGame);
GamesRoutes.patch('/:id', upload.single('image'), [isAuth], patchGame);
GamesRoutes.delete('/:id', [isAuth], deleteGame);

module.exports = GamesRoutes;
