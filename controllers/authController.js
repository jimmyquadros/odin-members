const passport = require('passport');
const Member = require('../models/member');

exports.login_post = passport.authenticate(
    'local',
    {
        successRedirect: '/',
        failureRedirect: '/',
        failureMessage: true,
    }
);

exports.logout_get = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');
    })
}

exports.verify_post = async (req, res, next) => {
    require('dotenv').config;
    const verifyCode = process.env.VERIFY_CODE;
    if (req.body.verify === verifyCode) {
        try {
            const member = new Member({
                username: req.user.username,
                password: req.user.password,
                verified: true,
                admin: req.user.admin,
                _id: req.user._id
            });
            const theMember = await Member.findByIdAndUpdate(req.user._id, member);
        } catch(err) {
            next(err);
        }

    }
    
    res.redirect('/');
}