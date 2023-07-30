const guest = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        console.log('not loggedIn');
        return res.redirect('/auth/login');
    }
    return next();
}

module.exports = guest;