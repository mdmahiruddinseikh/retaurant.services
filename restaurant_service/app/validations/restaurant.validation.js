const Joi = require("joi");

module.exports = {

    createCustomerSchemaValidation: (req, res, next) => {


        console.log(req.body)

        // create schema object
        const schema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            cusine: Joi.string(),
            avg_rating: Joi.number(),
            total_reviews: Joi.number(),
            locations: Joi.array(),
            contact_no: Joi.string().min(10).required(),
            menus: Joi.array()
                .items({
                    name: Joi.string()
                        .required(),
                    category: Joi.string()
                        .required(),
                    price: Joi.number()
                        .required()
                })
        });
        validateRequest(req, next, schema);
    }
}

// helper functions
function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        // next({ status: 401, response: 'validationerror', msg: error.details, data: error });
    } else {
        req.body = value;
        next();
    }
}