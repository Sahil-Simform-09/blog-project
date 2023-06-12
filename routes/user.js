const express  = require('express');
const router = express.Router();

const {handleUserProfile, getBlogById, handleUserProfileImage} = require('../app/controlllers/user-controller');
const guest = require('../app/midlewares/guest');

router.get('/profile', guest, handleUserProfile);

// get particular blogs by id
router.get('/blog/:blogId', getBlogById);

// add profile image
router.post('/profile/image', handleUserProfileImage);

module.exports = router;