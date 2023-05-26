const express  = require('express');
const app = express();

// rquire all routes
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');


// ------------------------------ middlewares ------------------------------ //
// ------ static files //
app.use(express.static('public'));

// ------ body parse middleware //
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ------ route middlewares //
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);



app.listen(3000, () => console.log('server is listing on port 3000'));