const express  = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            res.json(JSON.parse(blogs));
            res.end();
        } else {
            console.log(err);
        }
    });
});

router.get('/:blogId([0-9]{5})', (req, res) => {
    const {blogId} = req.params;
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            const blogObject = JSON.parse(blogs).blogs;
            const index = blogObject.findIndex( blog => blog.id === Number(blogId));
            
            if(index !== -1) {
                res.json(blogObject[index]);
            } else {
                res.send(`blog with id ${blogId} does not exist`);
            }
        } else {
            console.log(err);
        }
    });
});

module.exports = router;