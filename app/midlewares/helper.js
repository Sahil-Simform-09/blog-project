const handleError = (error, req, res, next) => {
    console.log(error);
    return res.render('err', {statusCode: error.httpStatusCode, message: error.message});
}

module.exports = handleError;