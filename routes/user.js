const express  = require('express');
const router = express.Router();

const {handleUserProfile, getBlogById} = require('../app/controlllers/user-controller');
const guest = require('../app/midlewares/guest');

router.get('/profile', guest, handleUserProfile);

// get particular blogs by id
router.get('/blog/:blogId', getBlogById);

module.exports = router;