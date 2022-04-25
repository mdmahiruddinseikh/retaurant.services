const Joi = require("joi");

module.exports = {

    createOrderSchemaValidation: (req, res, next) => {
        // create schema object
        const schema = Joi.object({
            customer_id: Joi.string().required(),
            amount: Joi.number().precision(2).required(),
            // items: Joi.array().required(),
            items: Joi.array()
                .items({
                    restaurant_id: Joi.string()
                        .required(),
                    menu_id: Joi.string()
                        .required(),
                    price: Joi.number().precision(2)
                        .required()
                })
        });
        validateRequest(req, next, schema);
    },

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