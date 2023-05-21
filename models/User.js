const mongoose = require('../db/conn')

// Define Mongoose schema for User
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: {type: String, required: true},
    password: String
    
  });

  // Define Mongoose model for User
const User = mongoose.model('User', userSchema);

module.exports = User;
