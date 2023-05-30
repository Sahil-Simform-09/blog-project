const express  = require('express');
const router = express.Router();

const {handleDeleteBlogById, handleGetAllBlog, handleGetBlogById, handleNewBlog, handleUpdateBlogById} = require('../controlllers/blog-controller');
// get all blogs
router.get('/', handleGetAllBlog);

// create a new blog
router.get('/create', handleNewBlog().index);
router.post('/create', handleNewBlog().create);

// update a particular blog
router.get('/:id/edit',handleUpdateBlogById().index);
router.put('/:id/edit', handleUpdateBlogById().update);

// delete a new blog
router.delete('/:blogId/delete', handleDeleteBlogById);


// get particular blogs by id
router.get('/:blogId', handleGetBlogById);

module.exports = router;