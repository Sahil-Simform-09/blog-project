const fs = require('fs/promises');
const path = require('path');
const Blog = require('../../models/blog');
const User = require('../../models/user');
const ReadList = require('../../models/readlist');

const TOTAL_BLOGS_PER_PAGE = 3;

const mongoose = require('mongoose');
const user = require('../../models/user');

const createNewBlog = () => {
    return {
        index(req, res) {
            res.render('create', {whichWork: 'create', status: 200});
        },
        async create(req, res, next) {
            try {
                const {title, content} = req.body;
                const userId = req.session.userId;
              
                const blog = new Blog({ // create new blog
                    title,
                    user: userId,
                    content
                })
                await blog.save();

                await User.findByIdAndUpdate(userId, { // add blogId in user collection
                    $push: {
                        blogs: blog.id
                    }
                });
                return res.redirect('/user/profile');
            } catch(error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        }
    }
}
const updateBlogById = () => {
    return {
        async index(req, res, next) {            
            try {
                const {blogId} = req.params;
                const blogObjectId = new mongoose.Types.ObjectId(blogId);
                const blog = await Blog.findById(blogObjectId);
                
                if(!blog) {
                    err = new Error(`blog with id ${blogObjectId} does not exist`);
                    err.httpStatusCode = 404;
                    return next(err);
                }   
                return res.render('create', {whichWork: 'edit', blog, status: 200});
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        },
        async update(req, res, next) {
            try {
                const blog = req.body;

                const {blogId} = req.params;
                const blogObjectId = new mongoose.Types.ObjectId(blogId);

                const updatedBlog = await Blog.findByIdAndUpdate(blogObjectId, {
                    title: blog.title,
                    content: blog.content
                });
                return res.json({message: 'Data Deleted successfully.', status: 'ok', redirectUrl: '/user/profile'});
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        }
    }
}
const deleteBlogById = async (req, res, next) => {
    try {
        const {blogId} = req.params;
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const userId = req.session.userId;

        await Blog.deleteOne({ // delete blog from blog collection
            _id: blogObjectId
        });
        
        await User.findByIdAndUpdate(userId, {
            $pull: {
                blogs: blogId
            }
        });
        return res.json({message: 'Data Deleted successfully.', status: 200, redirectUrl: '/user/profile'});     
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}
const getAllBlog = async (req, res, next) => {
    try {
        const pageNumber = Number(req.query.page) || 1;

        const numberOfBlogs = await Blog.find().countDocuments();
        const blogs = await Blog.find()
                                .skip((pageNumber - 1) * TOTAL_BLOGS_PER_PAGE)
                                .limit(TOTAL_BLOGS_PER_PAGE)
                                .populate('user');

        return res.render('blogs', {
            status: 200,
            blogs,
            numberOfBlogs,
            hasNextPage: pageNumber*TOTAL_BLOGS_PER_PAGE < numberOfBlogs,
            hasPrevPage: pageNumber > 1,
            currentPage: pageNumber,
            nextPage: pageNumber + 1,
            prevPage: pageNumber - 1,
            lastPage: Math.ceil(numberOfBlogs / TOTAL_BLOGS_PER_PAGE)
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
const getSearchBlogs = async (req, res, next) => {
    const {query} = req.body;
    
    const pageNumber = Number(req.query.page) || 1;
    const blogs = await Blog.find({
        $text: {
            $search: query
        }
    }, {
        score: {
            $meta: 'textScore'
        }
    }).sort({
        score: {
            $meta: 'textScore'
        }}
    );
    const numberOfBlogs = blogs.length;

    return res.render('blogs', {
        status: 200,
        blogs,
        numberOfBlogs,
        hasNextPage: pageNumber*TOTAL_BLOGS_PER_PAGE < numberOfBlogs,
        hasPrevPage: pageNumber > 1,
        currentPage: pageNumber,
        nextPage: pageNumber + 1,
        prevPage: pageNumber - 1,
        lastPage: Math.ceil(numberOfBlogs / TOTAL_BLOGS_PER_PAGE)
    });
}
const getBlogById = async (req, res, next) => {
    try {
        const {blogId} = req.params;
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const blog = await Blog.findById(blogObjectId).populate('user');
        if(!blog) {
            err = new Error(`blog with id ${blogObjectId} does not exist`);
            err.httpStatusCode = 404;
            return next(err);
        }   
        return res.render('blog', {
            blog,
            userId: req.session.userId,
            isCreator: blog.user === req.session.userId,
            status: 200,
            totalLikes: blog.likes.length,
            totalComments: blog.comments.length
        });
    } catch (error) {
	    const err = new Error(error);
		error.name === "BSONError" ? err.httpStatusCode = 404 : err.httpStatusCode = 500;
		next(err);
	}
}
const likeBlog = async (req, res, next) => {
    const {userId} = req.body;
    const blogId = req.params.blogId;

    const blogObjectId = new mongoose.Types.ObjectId(blogId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    console.log(blogObjectId);
    console.log(userObjectId);

    try {
        const blog = await Blog.findByIdAndUpdate(blogObjectId, {
            $addToSet: {
                likes: userObjectId
            }
        }, {
            new: true
        });
        return res.json({
            blog,
            userId: req.session.userId,
            isCreator: blog.user === req.session.userId,
            status: 200,
            totalLikes: blog.likes.length,
            totalComments: blog.comments.length
        });
    } catch(error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
const commentBlog = async (req, res, next) => {
    const {userId, comment} = req.body;
    const blogId = req.params.blogId;

    const blogObjectId = new mongoose.Types.ObjectId(blogId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    try {
        const blog = await Blog.findByIdAndUpdate(blogObjectId, {
            $push: {
                comments: {
                    userId: userObjectId,
                    comment,
                    createdAt: new Date()
                }
            }
        }, {
            new: true
        });
        return res.json({
            blog,
            userId: req.session.userId,
            isCreator: blog.user === req.session.userId,
            status: 200,
            totalLikes: blog.likes.length,
            totalComments: blog.comments.length,
            redirectUrl: req.originalUrl
        });
    } catch(error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
module.exports = {getAllBlog, getBlogById, deleteBlogById, updateBlogById, createNewBlog, likeBlog, commentBlog, getSearchBlogs};

