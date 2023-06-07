const fs = require('fs');

const handleUserProfile = (req, res) => {

    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.redirect('auth/login');
        }
    
        try {
            if(!req.session.user) {
                return res.redirect('/auth/login');
            }
            // Parse the JSON string into a JavaScript objectE
            const usersArray = JSON.parse(data).users;

            const index = usersArray.findIndex( user => user.email === req.session.user.email);

            // check email exist in Database
            if(index === -1) {
                console.log(`User does not exist with email: ${email}`);
                return res.redirect('auth/login');
            }

            fs.readFile('blog.json', (err, blogs) => {
                if(!err) {
                    const blogsArray = JSON.parse(blogs.toString()).blogs;
                    const LoggedInUserBlogsArray = blogsArray.filter( blog => blog.author === req.session.user.userName );
                    res.render('profile', {blogs: LoggedInUserBlogsArray, user: usersArray[index]});
                } else {
                    console.log(err);
                }
            });

            } catch (err) {
                console.error('Error parsing JSON:', err);
                return res.redirect('auth/login');
            }
        });

    
}

const updateBlogById = () => {
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
                return res.json({"message": "Data updated successfully.", "status": "ok"});
                });
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
            });
        }
    }
}
const deleteBlogById = (req, res) => {
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
const getBlogById = (req, res) => {
    const {blogId} = req.params;
    fs.readFile('blog.json', (err, blogs) => {
        if(!err) {
            const blogObject = JSON.parse(blogs).blogs;
            const index = blogObject.findIndex( blog => blog.id === Number(blogId));
            
            if(index !== -1) {
                console.log(req.session.user);
                res.render('blog', {blog: blogObject[index], url: req.originalUrl});
            } else {
                res.send(`blog with id ${blogId} does not exist`);
            }
        } else {
            console.log(err);
            return res.end();
        }
    });
}

module.exports = {handleUserProfile, updateBlogById, deleteBlogById, getBlogById};