require('dotenv').config();
const express  = require('express');
const app = express();
const  cookieParser = require('cookie-parser');
// rquire all routes
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// ------------------------------ middlewares ------------------------------ //

// ------ static files //
app.use(express.static('public'));

// ------ body parse middleware //
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ------ cookie parse middleware //
app.use(cookieParser());

// ------ route middlewares //
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.listen(3000, () => console.log('server is listing on port 3000'));