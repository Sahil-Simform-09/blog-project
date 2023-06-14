const jwt = require('jsonwebtoken');
const guest = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if(!accessToken) {
        console.log('This accessToken is not sended');
        return next();
    } 

    jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if(err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    console.log('accessToken expired');
                    res.clearCookie('access_token');
                    next();
                    break;
                default:
                    console.log('invalid accessToken');
                    next();
                    break;
            }
        }
        return res.redirect('/');
    });
    return ;
}
module.exports = guest;