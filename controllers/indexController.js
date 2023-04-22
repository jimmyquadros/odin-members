const Message = require('../models/message');
const { validationResult } = require('express-validator')

const { DateTime } = require('luxon');

exports.index_get = async (req, res, next) => {
    try {
        const sessionMessages = (req.session.messages) ? Array(req.session.messages) : null;
        const validErrors = (req.session.validErrors) ? req.session.validErrors : null;
        const messageContent = (req.session.messageContent) ? req.session.messageContent : null;
        if (req.session.messages) req.session.messages = null;
        if (req.session.validErrors) req.session.validErrors = null;
        if (req.session.messageContent) req.session.messageContent = null;
        const messages = await Message.find({})
            .sort({ date_posted: -1 })
            .populate('member')
        const title = (req.user) ? 'Welcome Member' : 'Welcome';
        res.render('index', 
            { 
                title, 
                member: req.user, 
                messages: messages, 
                err: sessionMessages,
                validError: validErrors,
                content: messageContent, 
            });
    } catch(err) {
        return next(err);
    }
}