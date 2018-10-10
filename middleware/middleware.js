module.exports = {

    // Middleware Function To See If User Is Logged In Before Performing CUD On Posts
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }

        // Flash message on failure
        req.flash('error', 'Please login to do that.');
        res.redirect('/users/login');
    }
};