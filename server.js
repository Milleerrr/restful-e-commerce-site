/*
 * Package Imports
 */
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Users = require('./routes/users');

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/users', Users.getUsers);
server.get('/users/:id', Users.getUserById);
server.post('/users', Users.createUser);

server.listen(PORT, () => { console.log(`Server listening on Port ${PORT}`) });