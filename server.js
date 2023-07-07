const express = require('express');
const server = express();
const passport = require("passport");
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = server;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
server.use(cors());

// Add middware for parsing request bodies here:
server.use(bodyParser.json());

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  server.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
  });
}
