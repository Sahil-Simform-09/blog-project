const express  = require('express');
const router = express.Router();
const guest = require('../app/midlewares/guest');
const edit = require('../app/midlewares/edit');

const {getAllBlog, getBlogById, createNewBlog, updateBlogById, deleteBlogById, likeBlog, commentBlog, getSearchBlogs} = require('../app/controlllers/blog-controller');
// get all blogs
router.get('/', getAllBlog);

// create a new blog
router.get('/create', guest, createNewBlog().index);
router.post('/create', guest, createNewBlog().create);

// get particular blogs by id
router.get('/:blogId', getBlogById);

// update a particular blog
router.get('/:blogId/edit/:userId', edit, updateBlogById().index);
router.patch('/:blogId/edit/:userId', edit, updateBlogById().update);

// delete a new blog
router.delete('/:blogId/delete/:userId', edit, deleteBlogById);

// add like
router.post('/:blogId/like', guest, likeBlog);

// add comment
router.post('/:blogId/comment', guest, commentBlog);

// get search blogs
router.post('/search', getSearchBlogs);

module.exports = router;