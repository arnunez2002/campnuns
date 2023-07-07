

const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');
//Definimos nuestro middleware  
//Aqui definimos nuestro propio schema


//Metodo para asegurarme de que el ususario no pueda escribir coigo html o script en los input
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML:{
            validate(value, helpers){
                const clean = sanitizeHtml(value, {
                    allowedTags:[],
                    allowedAttributes:{},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
})

//Esto hace que pueda usar la extensión que creé
//Creamos el Joi original y le agregamos la extensión
const Joi = BaseJoi.extend(extension)



module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        tittle: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        /* image: Joi.string().required(), */
        description: Joi.string().required().escapeHTML(),
        coordenates: Joi.string().allow('').escapeHTML()
        
    }).required(),
    deleteImages: Joi.array()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})

