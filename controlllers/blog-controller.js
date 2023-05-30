const fs = require('fs');
const path = require('path');

const generateId = () => {
    return Date.now();
}
const handleNewBlog = () => {
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
                return res.redirect('/blog');
                });
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
            });
        }
    }
}
const handleUpdateBlogById = () => {
    return {
        index (req, res) {
            const {id} = req.params;
            fs.readFile('blog.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.end();
            }
        
            try {
                // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                
                const index = blogsArray.findIndex( oneBlog => oneBlog.id === Number(id));
                const blogToUpdate = blogsArray[index];
                res.render('create', {whichWork: 'edit', blog: blogToUpdate});
            } catch (err) {
                console.error('Error parsing JSON:', err);
                res.end();
            }
            });
        },
        update(req, res) {

            const blog = req.body;
            fs.readFile('blog.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.end();
            }
        
            try {
                // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                
                const index = blogsArray.findIndex( oneBlog => oneBlog.id === Number(blog.id));
                // Modify the specific property
                const blogToUpdate = blogsArray[index];
                blogToUpdate.title = blog.title;
                blogToUpdate.author = blog.author;
                blogToUpdate.content = blog.content;
        
                blogsArray.splice(index, 1, blogToUpdate);
                // Convert the JavaScript object back to a JSON string
                const jsonString = '{"blogs":' + JSON.stringify(blogsArray) +'}';
        
               // Write the JSON string back to the file
                fs.writeFile('blog.json', jsonString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                    return res.json({"message": "Error writing to JSON file:", "status": "Error"});
                }
        
                console.log('Data updated successfully.');
                res.status(200);
                return res.json({"message": "Data Deleted successfully.", "status": "ok"});
                });
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
            });
        }
    }
}
const handleDeleteBlogById = (req, res) => {
    const {blogId} = req.params;
    fs.readFile('blog.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.end();
        }
    
        try {
            // Parse the JSON string into a JavaScript object
            const blogsArray = JSON.parse(data).blogs;
            const index = blogsArray.findIndex( blog => blog.id === Number(blogId));
            
            blogsArray.splice(index, 1);
            // Convert the JavaScript object back to a JSON string
            const jsonString = '{"blogs":' + JSON.stringify(blogsArray) + '}'; 
            
            // Write the JSON string back to the file
            fs.writeFile('blog.json', jsonString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                    return res.json({"message": "Error writing to JSON file:", "status": "Error"});
                }
                
                console.log('Data Deleted successfully.');
                return res.json({"message": "Data Deleted successfully.", "status": "ok"});
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
        });
}
const handleGetBlogById = (req, res) => {
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
}
const handleGetAllBlog = (req, res) => {
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            res.render('blogs', {blogs: JSON.parse(blogs.toString()).blogs});
        } else {
            console.log(err);
        }
    });
}

module.exports = {handleDeleteBlogById, handleGetAllBlog, handleGetBlogById, handleNewBlog, handleUpdateBlogById};