const express  = require('express');
const router = express.Router();
const guest = require('../app/midlewares/guest');

const {getAllBlog, getBlogById, createNewBlog, updateBlogById, deleteBlogById} = require('../app/controlllers/blog-controller');
// get all blogs
router.get('/', getAllBlog);

// create a new blog
router.get('/create', guest, createNewBlog().index);
router.post('/create', createNewBlog().create);

// get particular blogs by id
router.get('/:blogId', getBlogById);

// update a particular blog
router.get('/:blogId/edit',updateBlogById().index);
router.patch('/:blogId/edit', updateBlogById().update);

// delete a new blog
router.delete('/:blogId/delete', deleteBlogById);
module.exports = router;