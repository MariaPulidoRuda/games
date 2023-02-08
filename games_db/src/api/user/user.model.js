const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, /*unique: true*/ trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
module.exports = mongoose.model("user", userSchema);