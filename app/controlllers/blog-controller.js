const fs = require('fs/promises');
const path = require('path');
const {getBlogById} = require('./user-controller');
const mongoose = require('mongoose');
const Blog = require('../../models/blog');

const generateId = () => {
    return Date.now();
}
const createNewBlog = () => {
    return {
        index(req, res) {
            res.render('create', {whichWork: 'create'});
        },
        async create(req, res, next) {
            try {
                const {title, content} = req.body;
                const author = req.session.user.userName;
              
                const blog = new Blog({
                    title,
                    content,
                    author,
                })
                await blog.save();
                 
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
                const data = await fs.readFile('blog.json', 'utf8');
                // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                
                const index = blogsArray.findIndex( oneBlog => oneBlog.id === Number(blogId));
                const blogToUpdate = blogsArray[index];
                res.render('create', {whichWork: 'edit', blog: blogToUpdate});
            } catch (error) {
                const err = new Error(error);
                err.httpStatusCode = 500;
                next(err);
            }
        },
        async update(req, res, next) {
            try {
                const blog = req.body;
                const data = await fs.readFile('blog.json', 'utf8');
            
                // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                    
                const index = blogsArray.findIndex( oneBlog => oneBlog.id === Number(blog.id));
                    
                // Modify the specific property
                const blogToUpdate = blogsArray[index];
                blogToUpdate.title = blog.title;
                blogToUpdate.content = blog.content;
            
                blogsArray.splice(index, 1, blogToUpdate);
                    // Convert the JavaScript object back to a JSON string
                const jsonString = '{"blogs":' + JSON.stringify(blogsArray) +'}';
                
                // Write the JSON string back to the file
                await fs.writeFile('blog.json', jsonString, 'utf8');
                return res.redirect('/user/profile', {"message": "Data updated successfully.", "status": "ok"});
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
        const data = await fs.readFile('blog.json', 'utf8');

        const blogsArray = JSON.parse(data).blogs;
        const index = blogsArray.findIndex( blog => blog.id === Number(blogId));
            
        blogsArray.splice(index, 1);
        // Convert the JavaScript object back to a JSON string
        const jsonString = '{"blogs":' + JSON.stringify(blogsArray) + '}'; 
            
        await fs.writeFile('blog.json', jsonString, 'utf8');                
        return res.redirect('/user/profile' ,{"message": "Data Deleted successfully.", "status": "ok"});     
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
const getAllBlog = async (req, res, next) => {
    try {
        const blogs = await fs.readFile('blog.json', 'utf-8');
        res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err);
    }
}
module.exports = {getAllBlog, getBlogById, deleteBlogById, updateBlogById, createNewBlog};