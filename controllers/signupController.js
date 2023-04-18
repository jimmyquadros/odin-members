const bcrypt = require('bcryptjs');
const Member = require('../models/member');

exports.signup_get = (req, res, next) => {
    const errors = (req.session.signupErrors) ? req.session.signupErrors : null;
    if (req.session.signupErrors) req.session.signupErrors = null;
    res.render('signup', { title: 'Sign Up', member: req.user, errors });
}

exports.signup_post = (req, res, next) => {
    if (req.session.signupErrors) {
        return res.redirect('/signup');
    }
    bcrypt.hash(req.body.password, 10, async (err, hashpass) => {
        try {
            const member = new Member({
                username: req.body.username,
                password: hashpass,
                verified: false,
                admin: false,
            });
            const result = member.save()
            res.redirect('/');
        } catch(err) {
            return next(err);
        }
    })
}