const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const users = mongoose.model('users');

passport.use(
    new GoogleStrat({        
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/authentication/oauth/google/callback',
    },
    (access, refresh, profile, done) => {
        users.findOne({googleID: profile.id}).then(user => {
            if (user) {
                done(null, user);
            } else {
                new users({googleID: profile.id}).save().then(newUser =>
                    done(null, newUser)
                );
            }
        });
    })
);

// generates cookie for user; user.id is not Google profile id, but Mongo _id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((cookie_id, done) => {
    users.findById(cookie_id).then(user => {
        done(null, user);
    });
})