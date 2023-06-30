const edit = (req, res, next) => {
    console.log("in esdit middleware");
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    if(req.session.userId.toString() !== req.params.userId) {
        const err = new Error('Page Not found');
        err.httpStatusCode = 404;
        throw err;
    }
    return next();
}

module.exports = edit;