const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: { type: String, required: false },
    age: { type: Number, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    objective: { type: String, required: false },
    points: { type: Number, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
