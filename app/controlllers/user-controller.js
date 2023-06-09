const fs = require('fs/promises');

const handleUserProfile = async (req, res) => { 
    try {
        const data = await fs.readFile('user.json', 'utf8');
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

        try {  
            const blogs = await fs.readFile('blog.json', 'utf-8');
            const blogsArray = JSON.parse(blogs.toString()).blogs;
            const LoggedInUserBlogsArray = blogsArray.filter( blog => blog.author === req.session.user.userName );
            res.render('profile', {blogs: LoggedInUserBlogsArray, user: usersArray[index]});
        } catch (error) {
            console.log(err);
        }

    } catch (error) {
        console.error('Error reading JSON file:', err);
        return res.redirect('auth/login');
    }  
}

const updateBlogById = () => {
    return {
        async index(req, res) {
            const {id} = req.params;
            try {
                const data = await fs.readFile('blog.json', 'utf8');
                 // Parse the JSON string into a JavaScript objectE
                const blogsArray = JSON.parse(data).blogs;
                
                const index = blogsArray.findIndex( oneBlog => oneBlog.id === Number(id));
                const blogToUpdate = blogsArray[index];
                res.render('create', {whichWork: 'edit', blog: blogToUpdate});
            } catch (error) {
                console.error('Error reading JSON file:', err);
                return res.end();
            }
        },
        async update(req, res) {

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
                
                try {
                    // Write the JSON string back to the file
                    await fs.writeFile('blog.json', jsonString, 'utf8');
                    console.log('Data updated successfully.');
                    res.status(200);
                    return res.json({"message": "Data updated successfully.", "status": "ok"});
                } catch (error) {
                    console.error('Error writing to JSON file:', err);
                    return res.json({"message": "Error writing to JSON file:", "status": "Error"});
                }
            } catch (error) {
                console.error('Error reading JSON file:', err);
                return res.end();
            }
        }
    }
}
const deleteBlogById = async (req, res) => {
    try {
        console.log('Im in delete');
        const {blogId} = req.params;
        await fs.readFile('blog.json', 'utf8');

        const blogsArray = JSON.parse(data).blogs;
        const index = blogsArray.findIndex( blog => blog.id === Number(blogId));
            
        blogsArray.splice(index, 1);
        // Convert the JavaScript object back to a JSON string
        const jsonString = '{"blogs":' + JSON.stringify(blogsArray) + '}'; 
            
        try {
            await fs.writeFile('blog.json', jsonString, 'utf8');
                
            console.log('Data Deleted successfully.');
            return res.json({"message": "Data Deleted successfully.", "status": "ok"});
        } catch (error) {
            console.error('Error writing to JSON file:', err);
            return res.json({"message": "Error writing to JSON file:", "status": "Error"});
        }
        // Write the JSON string back to the file
       
    } catch (error) {
        console.log('Error reading JSON file:', error);
        return res.redirect('/user/profile');
    }
}
const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blogs = await fs.readFile('blog.json', 'utf-8');
        const blogObject = JSON.parse(blogs).blogs;
        const index = blogObject.findIndex( blog => blog.id === Number(blogId));
            
        if(index !== -1) {
            console.log(req.session.user);
            res.render('blog', {blog: blogObject[index], url: req.originalUrl});
        } else {
            res.send(`blog with id ${blogId} does not exist`);
        }    
    } catch (error) {
        console.log(error);
        return res.end();
    }
}

module.exports = {handleUserProfile, updateBlogById, deleteBlogById, getBlogById};