const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/teste1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectou ao Mongoose');
  })
  .catch((error) => {
    console.error('Erro de conexão:', error);
  });

  module.exports = mongoose