const express  = require('express');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');
const app = express();

// middlewares
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/blog', blogRouter);

app.listen(3000, () => console.log('server is listing on port 3000'));