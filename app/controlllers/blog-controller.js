const fs = require('fs/promises');
const path = require('path');
const {getBlogById} = require('./user-controller');

const generateId = () => {
    return Date.now();
}
const createNewBlog = () => {
    return {
        index(req, res) {
            res.render('create', {whichWork: 'create'});
        },
        async create(req, res) {

            const blog = req.body;

            try {
                const data = await fs.readFile('blog.json', 'utf-8');
                const blogsArray = JSON.parse(data).blogs;

                blog.id = generateId();
                blog.author = req.session.user.userName;
                // Modify the specific property
                blogsArray.push(blog);
        
                // Convert the JavaScript object back to a JSON string
                const jsonString = '{"blogs":' + JSON.stringify(blogsArray) +'}';
        
                // Write the JSON string back to the file
                try {
                    await fs.writeFile('blog.json', jsonString, 'utf8');
                } catch (error) {
                    console.log(error);
                }
        
                console.log('Data written successfully.');
                return res.redirect('/user/profile');
            } catch(error) {
                console.log('Error reading JSON file:', err);
                return res.end();
            }
        }
    }
}
const getAllBlog = async (req, res) => {
    try {
        const blogs = await fs.readFile('blog.json', 'utf-8');
        res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllBlog, getBlogById, createNewBlog};