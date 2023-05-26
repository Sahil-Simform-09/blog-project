const express  = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log();
    res.render('index');
});

module.exports = router;