const express  = require('express');
const router = express.Router();

const {handleUserProfile, updateBlogById, deleteBlogById, getBlogById} = require('../app/controlllers/user-controller');
const guest = require('../app/midlewares/guest');

router.get('/profile', guest, handleUserProfile);

// update a particular blog
router.get('/blog/:id/edit',updateBlogById().index);
router.patch('/blog/:id/edit', updateBlogById().update);

// delete a new blog
router.delete('/blog/:blogId/delete', deleteBlogById);

// get particular blogs by id
router.get('/blog/:blogId', getBlogById);

module.exports = router;