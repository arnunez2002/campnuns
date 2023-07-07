const express = require('express');
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/cathAsyc');
const { reviewSchema } = require('../schemas.js')
const ExpressError = require('../utils/ExpressError');
const campground = require('../models/campground');
//--------------------------REVIEWS-------------------




router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewsId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deletereview))


module.exports = router;