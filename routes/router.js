const express = require('express');
const router = express.Router();

// import controllers
const indexController = require('../controllers/indexController');
const signupController = require('../controllers/signupController');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

// import validators
const messageValidator = require('../validators/messageValidator').use;
const signupValidator = require('../validators/signupValidator');

router.get('/', indexController.index_get);

router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.post('/message', messageValidator, messageController.message_post);
router.get('/message/:id/update', messageController.message_update_get);
router.post('/message/:id/update', messageValidator, messageController.message_update_post);

router.get('/signup', signupController.signup_get);
router.post('/signup', signupValidator.validateSignup, signupController.signup_post);
router.post('/verify', authController.verify_post);

module.exports = router;
