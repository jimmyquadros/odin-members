const { body, validationResult } = require('express-validator');
const Member = require('../models/member');

exports.validateSignup = [
    body('username')
        .trim()
        .isLength({ min: 1, max: 15 })
        .withMessage('Username must be between 1 and 15 characters.')
        .escape()
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                try {
                    Member.findOne({username: req.body.username})
                        .then(user => {
                            if (user) {
                                reject(new Error('Username already exists'));
                            }
                            resolve(true);
                        })
                } catch(err) {
                    reject(new Error('connection error'))
                }
            })
        }),
    body('password')
        .trim()
        .isLength({ min: 1 })
        .withMessage('password must be at least one character'),
    body('verify-password')
        .trim()
        .custom((value, {req}) => {
            return value === req.body.password;
        })
        .withMessage('passwords do not match'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        req.session.signupErrors = errors.array();
        return next();
    }
]