const express  = require('express');
const router = express.Router();
const {getHomePage} = require('../app/controlllers/home-controller');

router.get('/', getHomePage);

module.exports = router;