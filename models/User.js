const mongoose = require("../db/conn");

// Define Mongoose schema for User
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true },
});

// Define Mongoose model for User
const User = mongoose.model("User", userSchema);

module.exports = User;
