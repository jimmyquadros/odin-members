exports.index_get = (req, res, next) => {
    const title = (req.user) ? 'Welcome Member' : 'Welcome';
    res.render('index', { title, member: req.user })
}