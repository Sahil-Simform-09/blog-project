const jwt = require('jsonwebtoken');
const guest = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        console.log(authHeader);
        console.log('This token is not sended');
        res.status(401);
        return res.redirect('/auth/login');
    } 

    jwt.verify(token, 'safdiojes3453464j;rtje;rjht[erh]#r', (err, user) => {
        if(err) {
            console.log('invalid token');
            res.status(403);
            return res.redirect('/auth/login');
        }

        next();
    });
}

module.exports = guest;