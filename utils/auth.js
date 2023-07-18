const withAuth = (req, res, next) => {
    if (!req.session.logged_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;