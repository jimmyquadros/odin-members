const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('message')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Message must be between 1 and 1000 characters'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    };

    req.session.validErrors = errors.array();
    req.session.messageContent = req.body.message;
    return next();
};

module.exports = {
    use: [
        userValidationRules(),
        validate,
    ]
}