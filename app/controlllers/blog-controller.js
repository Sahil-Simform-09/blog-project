const fs = require('fs');
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
        create (req, res) {

            const blog = req.body;

            fs.readFile('blog.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.end();
            }
        
            try {
                // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                
                blog.id = generateId();
                blog.author = req.session.user.userName;
                console.log(blog);
                // Modify the specific property
                blogsArray.push(blog);
        
                // Convert the JavaScript object back to a JSON string
                const jsonString = '{"blogs":' + JSON.stringify(blogsArray) +'}';
        
                // Write the JSON string back to the file
                fs.writeFile('blog.json', jsonString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                    return res.end();
                }
        
                console.log('Data written successfully.');
                res.status(201);
                return res.redirect('/user/profile');
                });
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
            });
        }
    }
}
const getAllBlog = (req, res) => {
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
        } else {
            console.log(err);
        }
    });
}

module.exports = {getAllBlog, getBlogById, createNewBlog};