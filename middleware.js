const { campgroundSchema, reviewSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review  = require('./models/review')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //Lanza el mensaje
        //Store the url they are requesting
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be Signed in first!');
        // Si no colocamos el return nos saldrá el siguiente error
        //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.redirect('/login');
    }
    next();
}

//Definimos nuestro middleware  
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        //el map sirve para hacer un solo mensaje de error
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permissimo to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        //el map sirve para hacer un solo mensaje de error
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    console.log(req.params);
    const { id, reviewsId } = req.params;
    console.log('---------------')
    console.log(reviewsId)
    const review = await Review.findById(reviewsId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permissimo to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}