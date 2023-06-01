const express  = require('express');
const router = express.Router();
const guest = require('../midlewares/guest');

const {handleLogin, handleSignUp, handleLogout} = require('../controlllers/auth-controller');

router.get('/login', guest, handleLogin().index);
router.post('/login', handleLogin().postLogin);
router.get('/logout', handleLogout);

router.get('/signUp',guest, handleSignUp().index);
router.post('/signUp', handleSignUp().postSignUp);

module.exports = router; 