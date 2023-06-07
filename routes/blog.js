const express  = require('express');
const router = express.Router();
const guest = require('../app/midlewares/guest');
const { body } = require('express-validator');

const {getAllBlog, getBlogById, createNewBlog} = require('../app/controlllers/blog-controller');
// get all blogs
router.get('/', getAllBlog);

// create a new blog
router.get('/create', guest, createNewBlog().index);
router.post('/create', createNewBlog().create);

// get particular blogs by id
router.get('/:blogId', getBlogById);

module.exports = router;