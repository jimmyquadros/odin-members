const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const signupController = require('../controllers/signupController');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

router.get('/', indexController.index_get);

router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.post('/message', messageController.message_post);

router.get('/signup', signupController.signup_get);
router.post('/signup', signupController.signup_post);
router.post('/verify', authController.verify_post);

module.exports = router;
