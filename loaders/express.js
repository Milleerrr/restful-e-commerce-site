const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');

module.exports = (app) => {

    // Enable Cross Origin Resource sharing to all origins by default
    app.use(cors());

    // Transfrom req.body data into JSON format
    app.user(bodyParser.json());

    // Prases urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('trust proxy', 1);

    // Create a session
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    return app;
};