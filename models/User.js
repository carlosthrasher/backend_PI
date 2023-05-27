const mongoose = require("../db/conn");

// Define Mongoose schema for User
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Define Mongoose model for User
const User = mongoose.model("User", userSchema);

module.exports = User;
