const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true, /*unique: true,*/ trim: true },
    password: { type: String, required: true, trim: true },
    //role: { type: String, required: true, trime: true, defatult}
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
module.exports = mongoose.model("admin", userSchema);