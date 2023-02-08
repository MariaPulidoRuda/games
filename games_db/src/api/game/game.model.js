const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {

    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("games", gameSchema);