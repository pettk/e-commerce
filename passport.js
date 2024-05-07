const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const AuthService = require("./service/authService");
const app = express();
const UserInstance = new User();
const AuthServiceInstance = new AuthService();

app.use(passport.initialize());
app.use(passport.session());
    
app.use(passport.serializeUser((user, done) => {
    done(null, user);
}));
    
app.use(passport.deserializeUser((id, done) => {
    UserInstance.findById(id, function(err, user) {
        if(err) return done(err);
        return done(null, user);
    });
}
));
    
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await AuthServiceInstance(username, password);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    } 
));


module.exports = function configurePassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
};