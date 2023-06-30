const mongoose = require('mongoose');
const Blog = require('../../models/blog.js');
const User = require('../../models/user.js');

const handleUserProfile = async (req, res, next) => { 
    try {
        const user = await User.findById(req.session.userId)
                                .lean()
                                .populate('blogs');
        console.log(user);
        return res.render('profile', {
            message: '',
            status: 200,
            user: {userId: user._id, userName: user.userName, email: user.email, imgUrl: user.imgUrl},
            blogs: user.blogs,
            loggedInTime: false
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
        const blog = await Blog.findById(blogObjectId).lean();

        console.log(blog);
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
const handleUserProfileImage = async (req, res, next) => {
    try {
        const userId = req.session.userId;
	    await User.findByIdAndUpdate(userId, {
            imgUrl: `/uploads/${req.file.filename}`
        });
		return res.redirect('/user/profile');
	} catch (error) {
        const err = new Error(error); 
        err.httpStatusCode = 500;
        next(err);
    }   
}

module.exports = {handleUserProfile, getBlogById, handleUserProfileImage};