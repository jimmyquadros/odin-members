const Message = require('../models/message');
const Member = require('../models/member');

exports.message_post = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    try {
        const message = new Message({
            content: req.body.message,
            member: req.user._id,
            date_posted: Date.now(),
            date_updated: Date.now()
        });
        const result = await message.save();
        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}