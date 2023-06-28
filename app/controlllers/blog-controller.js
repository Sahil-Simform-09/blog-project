const fs = require('fs/promises');
const path = require('path');
const Blog = require('../../models/blog');
const User = require('../../models/user');

const mongoose = require('mongoose');
const user = require('../../models/user');

const createNewBlog = () => {
    return {
        index(req, res) {
            res.render('create', {whichWork: 'create'});
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
                return res.render('create', {whichWork: 'edit', blog});
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
                return res.json({"message": "Data updated successfully.", "status": "ok"});
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
        return res.json({"message": "Data Deleted successfully.", "status": "ok"});     
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}
const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('user');
        res.render('blogs', {blogs});
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
const getBlogById = async (req, res, next) => {
    try {
        const {blogId} = req.params;
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const blog = await Blog.findById(blogObjectId);
        if(!blog) {
            err = new Error(`blog with id ${blogObjectId} does not exist`);
            err.httpStatusCode = 404;
            return next(err);
        }   
        return res.render('blog', {blog, userId: ''});
    } catch (error) {
	    const err = new Error(error);
		error.name === "BSONError" ? err.httpStatusCode = 404 : err.httpStatusCode = 500;
		next(err);
	}
}
module.exports = {getAllBlog, getBlogById, deleteBlogById, updateBlogById, createNewBlog};