// Importing Express Router and Passport
const router = require('express').Router();
const passport = require('passport');

// Importing User Model
const User = require('../models/user');

// =================================================
//  REGISTERATION ROUTES
// =================================================

// Loads Register View
router.get('/register', (req, res) => {
    res.render('user/register');
});

// Handles User Register
router.post('/register', (req, res, next) => {
    let { username, email, password } = req.body;

    const newUser = new User({
        username,
        email
    });

    User.register(newUser, password)
    .then(user => {
        req.flash('success', 'Registration successful, please login.')
        res.redirect('/users/login');
    })
    .catch(err => {
        req.flash('error', 'Failed to register.');
        res.redirect('/users/register');
    });
});

// =================================================
//  LOGIN / LOGOUT ROUTES
// =================================================

// Loads Login View
router.get('/login', (req, res) => {
    res.render('user/login');
});

// Handles User Login
router.post('/login', passport.authenticate('local', {
    successFlash: 'Logged in.',
    successRedirect: '/posts',
    failureFlash: 'Username or password is invalid.',
    failureRedirect: '/users/login'
}), (req, res) => {
    // Code Body Empty
});

// Handles User Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out.');
    res.redirect('/');
});

// Exports Our User Routes
module.exports = router;