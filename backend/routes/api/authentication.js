const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/oauth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));

router.get('/oauth/google/callback', passport.authenticate(
    'google', 
    {successRedirect: 'http://localhost:3000', failureRedirect: '/oauth/google'}
));

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

module.exports = router;