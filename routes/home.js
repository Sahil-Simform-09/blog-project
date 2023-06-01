const express  = require('express');
const router = express.Router();
const {getHomePage} = require('../controlllers/home-controller');

router.get('/', getHomePage);

module.exports = router;