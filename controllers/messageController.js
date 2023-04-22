const message = require('../models/message');
const Message = require('../models/message');

exports.message_update_get = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id)
        const validErrors = (req.session.validErrors) ? req.session.validErrors : null;
        if (req.session.validErrors) req.session.validErrors = null;
        res.render('message', { member: req.user, content: message.content, validError: validErrors })
    } catch (err) {
        return next(err);
    }
}

exports.message_update_post = [
    async (req, res, next) => {
        if (!req.user) {
            return res.redirect('/');
        }
        if (req.session.validErrors) {
            return res.redirect(`/message/${req.params.id}/update`);
        }
        try {
            const oldMessage = await Message.findById(req.params.id);
            const newMessage = new Message({
                content: req.body.message,
                member: oldMessage.member,
                date_posted: oldMessage.date_posted,
                date_updated: Date.now(),
                _id: req.params.id,
            })
            const message = await Message.findByIdAndUpdate(req.params.id, newMessage, {});
            res.redirect('/');
        } catch(err) {
            return next(err)
        }
    }
]

exports.message_post = [
    async (req, res, next) => {
        if (!req.user) {
            return res.redirect('/');
        }
        if (req.session.validErrors) {
            return res.redirect('/');
        }
        try {
            const message = new Message({
                content: req.body.message,
                member: req.user._id,
                date_posted: Date.now(),
                date_updated: null,
            });
            const result = await message.save();
            res.redirect('/');
        } catch(err) {
            return next(err);
        }
}]