const GamesRoutes = require("express").Router();
const upload = require("../../middlewares/file"); 
const { isAuth } = require("../../middlewares/auth.middleware");

const {
  postGame,
  getGames,
  getGame,
  patchGame,
  deleteGame,
} = require("./game.controller");


GamesRoutes.post("/register", upload.single("image"), postGame);  //solo me deja registrar uno , en thunder, al intenter registrar otro me pone E11000 duplicate key error collection: games.games index: newGame_1 dup key: { newGame: null }"//ponerle la autenticación
GamesRoutes.get("/", getGames); //CORRECTO (PARA BUSCAR TODOS LOS JUEGOS ES SIN S, /GAME)
GamesRoutes.get("/:id", getGame); //correcto
GamesRoutes.patch("/:id", upload.single("image"), [isAuth], patchGame); //me aparece esto en thunder Plan executor error during findAndModify :: caused by :: Performing an update on the path '_id' would modify the immutable field '_id'"
GamesRoutes.delete("/:id", deleteGame); //ponerle la autenticación, pero en principio va

module.exports = GamesRoutes;




