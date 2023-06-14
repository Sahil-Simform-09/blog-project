const express  = require('express');
const ejs = require('ejs');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

// rquire all routes
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// ------------------------------ middlewares ------------------------------ //
//------ Use the session middleware //
app.use(session({ 
    store: new FileStore,
    secret: 'safdiojes3453464j;rtje;rjht[erh]#r', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 60 }
})); 

// ------ static files //
app.use(express.static('public'));

//------ cors middleware //
app.use(cors());

// ------ body parse middleware //
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ------ route middlewares //
app.use('/', homeRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.listen(3000, () => console.log('server is listing on port 3000'));