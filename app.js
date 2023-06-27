require('dotenv').config();
const express  = require('express');
const app = express();
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);

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

// mongodb connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected!!!'))
    .catch( err => {
        throw new Error(err);
    });

// ------------------------------ middlewares ------------------------------ //
//------ Use the session middleware //
app.use(session({ 
    store: new MongoStore({
        uri: process.env.MONGO_URL,
        expiresAfterSeconds: 60 * 60 * 24,
    }),
    secret: process.env.COOKIE_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 60 * 24}
})); 

// ------ secuirity middleware //
app.use(helmet());

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
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.httpStatusCode = 404;
    throw error;
});

// ------ error handler middleware //
app.use(helper);
app.listen(process.env.PORT, () => console.log('server is listing on port 3000'));