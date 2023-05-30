const express  = require('express');
const router = express.Router();

const {deleteBlogById, getAllBlog, getBlogById, createNewBlog,updateBlogById} = require('../controlllers/blog-controller');
// get all blogs
router.get('/', getAllBlog);

// create a new blog
router.get('/create', createNewBlog().index);
router.post('/create', createNewBlog().create);

// update a particular blog
router.get('/:id/edit',updateBlogById().index);
router.put('/:id/edit', updateBlogById().update);

// delete a new blog
router.delete('/:blogId/delete', deleteBlogById);


// get particular blogs by id
router.get('/:blogId', getBlogById);

module.exports = router;