const guest = (req, res, next) => {
    if(!req.cookies.access_token) {
        return next();
    }

    return res.redirect('/');
}

module.exports = guest;