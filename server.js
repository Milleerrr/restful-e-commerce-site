const express = require('express');
const sever = express();

const loaders = require('./loaders');

const PORT = process.env.PORT || 3001;

async function startServer() {

  // Init application loaders
  loaders(sever);

  // Start server
  sever.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();