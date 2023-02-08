const Game = require("./game.model");

const postGame = async (req, res, next) => {
    try {
      const newGame = new Game(req.body);
      if (req.file) {
        newGame.image = req.file.path;
      }
      const newGameInDB = await newGame.save();
  
      return res.json({
        status: 201,
        message: "Registered Game",
        data: { newGameInDB },
      });
    } catch (error) {
      return next(error);
    }
  };

  const getGames = async (req, res, next) => {
    try {
      const games = await Game.find();
      return res.json({
        status: 200,
        message: "Recovered all Games",
        data: { games },
      });
    } catch (error) {
      return next(setError(500, "Fail to recover games"));
    }
  };
  const getGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await Game.findById(id);
      res.status(200).json(game);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = new Game(req.body);
      if (req.file) {
        game._id = id;
        game._id.image = req.file.path;
      }
  
      const updateGame = await Game.findByIdAndUpdate(id, game);
      return res.status(200).json(updateGame);
    } catch (error) {
      return next(error);
    }
  };
  
  
  const deleteGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await Game.findByIdAndDelete(id);
      return res.json({
        status:200,
        message: "Deleted game",
        data: { game },
      });
    } catch (error) {
      return next(error);
    }
  };
  //si no va el delete, volverlo a poner como al principio. ahora mismo tiene el mensaje del error, pero antes no lo tenía. 

  module.exports = {
    postGame,
    getGame,
    getGames,
    patchGame,
    deleteGame,
  };
  