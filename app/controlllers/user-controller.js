const fs = require('fs/promises');
const mongoose = require('mongoose');
const Blog = require('../../models/blog.js');

const handleUserProfile = async (req, res, next) => { 
    try {
        const blogs = await Blog.find({
            userId: req.session.user.id
        });
        res.render('profile', {
            blogs,
            user: req.session.user,
        });

    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err)
    }  
}

const getBlogById = async (req, res, next) => {
    try {
        const {blogId} = req.params;
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const blog = await Blog.findById(blogObjectId);
        if(!blog) {
            err = new Error(`blog with id ${blogObjectId} does not exist`);
            err.httpStatusCode = 500;
            return next(err);
        }   
        return res.render('blog', {blog, url: req.originalUrl});
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err)
    }
}
const handleUserProfileImage = async (req, res, next) => {
    try {
	    const data = await fs.readFile('user.json', 'utf-8');
		const usersArray = JSON.parse(data).users;

		const index = usersArray.findIndex( user => user.email === req.session.user.email);
		const user = usersArray[index];
		user.imgUrl = `/uploads/${req.file.filename}`;

		usersArray.splice(index, 1, user);
		const jsonString = '{"users":' + JSON.stringify(usersArray) +'}';

		req.session.user.imgUrl = '/uploads/' + req.file.filename;

		await fs.writeFile('user.json', jsonString, 'utf8');

		return res.redirect('/user/profile');
	} catch (error) {
        const err = new Error(error); 
        err.httpStatusCode = 500;
        next(err);
    }   
}
module.exports = {handleUserProfile, getBlogById, handleUserProfileImage};