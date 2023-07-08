/*
 * Package Imports
 */
import express from 'express';
import session from "express-session";
import passport from "passport";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

export default server;

const PORT = process.env.PORT || 4001;

// Add middware for parsing request bodies here:
server.use(bodyParser.json());

// This conditional is here for testing purposes:
  // Add your code to start the server listening at PORT below:
  server.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
  });