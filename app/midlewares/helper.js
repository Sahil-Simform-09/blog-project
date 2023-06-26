const handleError = (error, req, res, next) => {
    console.log(error);
    if(error.httpStatusCode === 500) {
        return res.render('500');
    }
    return res.render('404');;
}

module.exports = handleError;