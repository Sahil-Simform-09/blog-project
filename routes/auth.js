const express  = require('express');
const router = express.Router();
const auth = require('../app/midlewares/auth');
const {body} = require('express-validator');
const fs = require('fs/promises');
const {handleLogin, handleSignUp, handleLogout} = require('../app/controlllers/auth-controller');

router.get('/login', auth, handleLogin().index);
router.post('/login', handleLogin().postLogin);
router.get('/logout', handleLogout);

router.get('/signUp', handleSignUp().index);
router.post(
    '/signUp', [
        body('email',).custom( async (email, {}) => {
            const data = await fs.readFile('user.json', 'utf8');
            const usersArray = JSON.parse(data).users;
            const index = usersArray.findIndex(user => user.email === email);
            if (index !== -1) {
                return Promise.reject('User allready exist with this email');
            }
        }),
        body('password', 'Password must be at least 8 characters long, must contain at least one number & must contain at least one uppercase letter')
        .isLength({min: 8})
        .matches(/(?=.*\d*)(?=.*[a-z])(?=.*\W)/)        
], handleSignUp().postSignUp);

module.exports = router; 