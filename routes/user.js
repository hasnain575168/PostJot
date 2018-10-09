const router = require('express').Router();
const passport = require('passport');

// Importing User Model
const User = require('../models/user');

// =================================================
//  REGISTERATION ROUTES
// =================================================
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', (req, res, next) => {
    let { username, email, password } = req.body;

    const newUser = new User({
        username,
        email
    });

    User.register(newUser, password)
    .then(user => {
        console.log(user);
        res.redirect('/users/login');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/users/register');
    });
});

// =================================================
//  LOGIN / LOGOUT ROUTES
// =================================================
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/users/login'
}), (req, res) => {

});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;