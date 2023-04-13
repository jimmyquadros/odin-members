const passport = require('passport');

exports.login_post = passport.authenticate(
    'local',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
);

exports.logout_get = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');
    })
}