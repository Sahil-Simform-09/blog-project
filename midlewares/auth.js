const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {

    const accessToken = req.cookies.access_token;
    if(!accessToken) {
        console.log('This accessToken is not sended');
        return res.redirect('/auth/login');
    } 

    jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if(err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    console.log('accessToken expired');
                    res
                    .clearCookie('access_token')
                    .redirect('/auth/login');
                    break;
                default:
                    console.log('invalid accessToken');
                    res.redirect('/auth/login');
                    break;
            }
        }

        next();
    });
}

module.exports = auth;