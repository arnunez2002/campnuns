if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}






const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const catchAsync = require('./utils/cathAsyc');
//this is an engine that are use to run/parse or make sense ejs
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')
const Joi = require('joi')
const { campgroundSchema, reviewSchema } = require('./schemas.js')
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
const mongoSanitize = require('express-mongo-sanitize');

const ExpressError = require('./utils/ExpressError');

const Campground = require('./models/campground');
const { nextTick } = require('process');
const { validate } = require('./models/campground');
const Review = require('./models/review');


const usersRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds')
const reviewsRoutes = require('./routes/reviews')
const MongoStore = require('connect-mongo');



//LA BASE DE DATOS EN MONGO CLOUD
const db_url = process.env.DB_URL;
//LA BASE DE DATOS LOCAL
const db_url_local =  'mongodb://localhost:27017/yelp-camp';
// process.env.DB_URL ||
/* 'mongodb://localhost:27017/yelpcamp' */


mongoose.connect(/* db_url */db_url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})



const app = express();


// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Requesr body to be parsed
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
// To remove data using these defaults:
app.use(mongoSanitize({
    replaceWith: '_',
}));


const secret = process.env.SECRET || 'thisshouldbebettersecret!';



const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})



const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    console.log(req.query)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//Ejemplo de cómo se registra un usuario
app.get('/makeuser', async (req, res) => {
    const user = new User({ email: 'andres@gmail.com', username: 'andresnu' });
    const newUser = await User.register(user, 'chicken')
    res.send(newUser);
})




//todo lo que empiece por campgrounds usará los campgrounds routes
app.use('/', usersRoutes)
app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:id/reviews', reviewsRoutes)


//-----------------------------------------------

//este muestra la palabra home
app.get('/', (req, res) => {
    res.render('home')
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Oh no, Something went wrong!'
    res.status(statusCode).render('error', { err })
})

//PUERTO DE HEROKU POR DEFECTO ES 80

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})