const bcrypt = require('bcryptjs');
const Member = require('../models/member');

exports.signup_get = (req, res, next) => {
    res.render('signup', { title: 'Sign Up', member: req.user });
}

exports.signup_post = (req, res, next) => {[
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
]}