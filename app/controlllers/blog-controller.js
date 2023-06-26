const fs = require('fs/promises');
const path = require('path');
const {getBlogById} = require('./user-controller');
const Blog = require('../../models/blog');
const { default: mongoose } = require('mongoose');

const createNewBlog = () => {
    return {
        index(req, res) {
            res.render('create', {whichWork: 'create'});
        },
        async create(req, res, next) {
            try {
                const {title, content} = req.body;
                const userId = req.session.user.id;
              
                const blog = new Blog({
                    title,
                    userId,
                    content
                })
                await blog.save();
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
                    err.httpStatusCode = 500;
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
        const blog = await Blog.deleteOne({
            _id: blogObjectId
        });
              
        return res.json({"message": "Data Deleted successfully.", "status": "ok"});     
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
module.exports = {getAllBlog, getBlogById, deleteBlogById, updateBlogById, createNewBlog};