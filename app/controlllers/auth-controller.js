const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const User = require('../../models/user');

const handleSignUp = () => {
    return {
        index(req, res) {
            res.render('signUp', { userName: '', email: '', password: '', errors: 'none' });
        },
        async postSignUp(req, res, next) {
            const {userName, email, password} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Return the validation errors
                return res.render('signUp', { userName: userName, email: email, password: password, errors: errors.array()[0].msg });
            }

            try {  
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    userName,
                    email,
                    password: hashedPassword,
                    blogs: [],
                    imgUrl: "data:image/jpeg;base64,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",
                });
                
                await user.save();    
                return res.render('login', {imgUrl: user.imgUrl, isRegistered: true, status: 200});
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        },
    }
}
const handleLogin = () => {
    return {
        index(req, res) {
            res.render('login', { email: '', password: '', errors: '', imgUrl: '', isRegistered: false });
        },
        async postLogin(req, res, next) {
            const {email, password} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Return the validation errors
                console.log('login timee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return res.render('login', { email: '', password: '', errors: '', imgUrl: '', isRegistered: false });
            }

            try {

                const user = await User.findOne({email}).populate('blogs');
                
                // check email exist in Database
                if(!user) {
                    return res.render('profile', {
                        message: 'User doest not exist with this email',
                        status: 401,
                        user: {userId: '', userName: '', email: '', imgUrl: ''},
                        blogs: '',
                        loggedInTime: false
                    });
                }

                // check password
                const hashedPassword = user.password;
                const result = await bcrypt.compare(password, hashedPassword);
                if(!result) {
                    return res.render('profile', {
                        message: 'User doest not exist with this email',
                        status: 401,
                        user: {userId: '', userName: '', email: '', imgUrl: ''},
                        blogs: '',
                        loggedInTime: false
                    });
                }
                
                req.session.isLoggedIn = true;
                req.session.userId = user._id;
                console.log(user.blogs);
                return res.render('profile', {
                    message: 'logged in',
                    status: 200,
                    user: {userId: user._id, userName: user.userName, email: user.email, imgUrl: user.imgUrl},
                    blogs: user.blogs,
                    loggedInTime: true
                });
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        }            
    }
}
const handleLogout = async (req, res, next) => {
    try {
        await  req.session.destroy();
        return res.redirect('/auth/login');
    } catch (error) {
        const err = new Error(err);
        err.httpStatusCode = 500;
        next(err);
    }
}
module.exports = {handleLogin, handleSignUp, handleLogout};
