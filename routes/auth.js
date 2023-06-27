const express  = require('express');
const router = express.Router();
const auth = require('../app/midlewares/auth');
const {body} = require('express-validator');
const fs = require('fs/promises');
const {handleLogin, handleSignUp, handleLogout} = require('../app/controlllers/auth-controller');
const User = require('../models/user');

router.get('/login', auth, handleLogin().index);
router.post(
    '/login', [
        body('email', 'Email is required').notEmpty().normalizeEmail(),
        body('password', 'Password is required').notEmpty().trim()
    ], handleLogin().postLogin);
router.get('/logout', handleLogout);

router.get('/signUp', auth, handleSignUp().index);
router.post(
    '/signUp', [
        body('email')
        .notEmpty().withMessage('Email is required')
        .custom( async (email, {}) => {
            const user = await User.find({email});
            if (!user) {
                return Promise.reject('User allready exist with this email');
            }
        })
        .normalizeEmail(),
        body('password', 'Password must be at least 8 characters long, must contain at least one number & must contain at least one uppercase letter')
        .isLength({min: 8})
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
        .trim()      
], handleSignUp().postSignUp);

module.exports = router; 