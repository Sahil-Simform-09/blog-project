const express  = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// get all blogs
router.get('/', (req, res) => {
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
        } else {
            console.log(err);
        }
    });
});

// create a new blog
router.get('/create', (req, res) => {
    res.render('create');
});
router.post('/create', (req, res) => {

    const blog = req.body;

    fs.readFile('blog.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return res.end();
    }

    try {
        // Parse the JSON string into a JavaScript object
        const jsonObject = JSON.parse(data);
        
        blog.id = generateId();
        // Modify the specific property
        jsonObject.blogs.push(blog);

        // Convert the JavaScript object back to a JSON string
        const jsonString = JSON.stringify(jsonObject); // The last argument (2) adds indentation for readability

        // Write the JSON string back to the file
        fs.writeFile('blog.json', jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to JSON file:', err);
            return res.end();
        }

        console.log('Data written successfully.');
        res.status(201);
        return res.redirect('/blog/create');
        });
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
    });
});

// get particular blogs by id
router.get('/:blogId', (req, res) => {
    const {blogId} = req.params;
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            const blogObject = JSON.parse(blogs).blogs;
            const index = blogObject.findIndex( blog => blog.id === Number(blogId));
            
            if(index !== -1) {
                res.render('blog', {blog: blogObject[index]});
            } else {
                res.send(`blog with id ${blogId} does not exist`);
            }
        } else {
            console.log(err);
            return res.end();
        }
    });
});

const generateId = () => {
    return Date.now();
}

module.exports = router;