const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../models/member');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            const member = await Member.findOne({ username: username });
            if (!member) {
                return done(null, false, { message: 'User does not exist' });
            }
            bcrypt.compare(password, member.password, (error, res) => {
                if (res) {
                    return done(null, member);
                }
                return done(null, false, { message: 'Incorrect password' });
            })
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const member = await Member.findById(id);
        done(null, member);
    } catch(err) {
        return done(err);
    }
})