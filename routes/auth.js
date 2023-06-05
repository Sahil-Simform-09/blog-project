const express  = require('express');
const router = express.Router();
const auth = require('../app/midlewares/auth');

const {handleLogin, handleSignUp, handleLogout} = require('../app/controlllers/auth-controller');

router.get('/login', auth, handleLogin().index);
router.post('/login', handleLogin().postLogin);
router.get('/logout', handleLogout);

router.get('/signUp', handleSignUp().index);
router.post('/signUp', handleSignUp().postSignUp);

module.exports = router; 