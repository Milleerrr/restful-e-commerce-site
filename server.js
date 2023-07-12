/*
 * Package Imports
 */
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

/*
 * Route Imports
 */
const Carts = require('./routes/carts');
const Inventory = require('./routes/inventory');
const Orders = require('./routes/orders');
const Products = require('./routes/products');
const Users = require('./routes/users');

dotenv.config();

const server = express();
const PORT = process.env.PORT || 4001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/*
 * Users routes
*/
server.get('/users', Users.getUsers);
server.get('/users/:id', Users.getUserById);
// server.post('/users', Users.createUser);
// server.put('/users/:id', Users.updateUser);
// server.delete('/users/:id', Users.deleteUser);

/*
 * Carts routes
*/
server.get('/carts/:id', Carts.getCartById);
server.post('/carts/:id', Carts.createCartById);
server.post('/carts', Carts.createCart);

server.listen(PORT, () => { console.log(`Server listening on Port ${PORT}`) });