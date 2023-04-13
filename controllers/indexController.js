const Message = require('../models/message');

exports.index_get = async (req, res, next) => {
    try {
        const messages = await Message.find({})
            .sort({ date_posted: -1 })
            .populate('member')
        const title = (req.user) ? 'Welcome Member' : 'Welcome';
        res.render('index', { title, member: req.user, messages: messages });
    } catch(err) {
        return next(err);
    }
}