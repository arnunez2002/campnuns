const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/cathAsyc');
const Campground = require('../models/campground');
const { application } = require('express');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const { storage } = require('../cloudinary')
const multer = require('multer')
const upload = multer({ storage })


router.route('/')
    //Aqui muestra todos los campos (es el C del CRUD)
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

//esto tiene que ir antes de la show page porque si no tomará el "new" como un id
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

console.log('AQUI SE SUPONE QUE VA A EMPEZAR EL UPDATE');
router.route('/:id')
    //SHOW PAGE
    .get(catchAsync(campgrounds.showCampground))
    //ADDEVENT FORM EDIT
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


//Dirigirme al formulario de editar un campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;