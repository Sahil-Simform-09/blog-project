require('dotenv').config();
const express  = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');
const multer = require('multer');

// rquire all routes
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');

// require error middleare
const helper = require('./app/midlewares/helper');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// ------------------------------ middlewares ------------------------------ //
//------ Use the session middleware //
app.use(session({ 
    store: new FileStore,
    secret: process.env.COOKIE_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 60 }
})); 

// ------ secuirity middleware //
app.use(helmet());

// ------ static files //
app.use(express.static('public'));

// ------ body parse middleware //
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer().single("profile-img"));

// ------ route middlewares //
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.httpStatusCode = 404;
    throw error;
})

// ------ error handler middleware //
app.use(helper);
app.listen(3000, () => console.log('server is listing on port 3000'));