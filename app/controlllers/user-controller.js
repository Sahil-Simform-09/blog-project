const fs = require('fs/promises');

const handleUserProfile = async (req, res, next) => { 
    try {
        const data = await fs.readFile('user.json', 'utf8');

        // Parse the JSON string into a JavaScript objectE
        const usersArray = JSON.parse(data).users;

        const index = usersArray.findIndex( user => user.email === req.session.user.email);

        // check email exist in Database
        if(index === -1) {
            return res.render('login',  { email: email, password: password, errors: `User does not exist with email: ${email}`});
        }

        const blogs = await fs.readFile('blog.json', 'utf-8');
        const blogsArray = JSON.parse(blogs.toString()).blogs;
        const LoggedInUserBlogsArray = blogsArray.filter( blog => blog.author === req.session.user.userName );
        res.render('profile', {blogs: LoggedInUserBlogsArray, user: usersArray[index]});

    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err)
    }  
}

const getBlogById = async (req, res, next) => {
    try {
        const {blogId} = req.params;
        const blogs = await fs.readFile('blog.json', 'utf-8');
        const blogObject = JSON.parse(blogs).blogs;
        const index = blogObject.findIndex( blog => blog.id === Number(blogId));
            
        if(index !== -1) {
            res.render('blog', {blog: blogObject[index], url: req.originalUrl});
        } else {
            err = new Error(`blog with id ${blogId} does not exist`);
            err.httpStatusCode = 404;
            next(err)
        }    
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        next(err)
    }
}
const handleUserProfileImage = (req, res, next) => {
    try {
        console.log(req.file);
        res.redirect('/user/profile');
    } catch (error) {
        const err = new Error(error); 
        err.httpStatusCode = 500;
        next(err);
    }   
}
module.exports = {handleUserProfile, getBlogById, handleUserProfileImage};