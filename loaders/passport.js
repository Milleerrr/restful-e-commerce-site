const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

    // Initilise passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Method to serialise data to store in cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Method to deserilise data stored in cookie and attach req.user
    passport.deserializeUser((id, done) => {
        done(null, { id });
    });

    // Configure LocalStrategy to be used for local login
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await AuthServiceInstance.login({ email: username, password });
                return done(null, user);
            } catch {
                return done(err);
            }
        }
    ));
};