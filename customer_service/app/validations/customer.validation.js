const Joi = require("joi");

module.exports = {

    createCustomerSchemaValidation: (req, res, next) => {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
            full_name: Joi.string().required(),
            password: Joi.string().min(4).required(),
            mobile_no: Joi.string().min(10).required(),
            address: Joi.array()
                .items({
                    address: Joi.string()
                        .required(),
                    city: Joi.string()
                        .required(),
                    state: Joi.string()
                        .required(),
                    pin: Joi.string().min(6)
                        .required(),
                    city: Joi.string(),
                })
        });
        validateRequest(req, next, schema);
    },
    customerLoginReqObjValidation: (req, res, next) => {
        const login_schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        validateRequest(req, next, login_schema);
    },
    updateCustomerSchemaValidation: (req, res, next) => {
        const update_schema = Joi.object({
            email: Joi.string().email(),
            mobile_no: Joi.string().min(10).required(),
            alternative_mobile_no: Joi.string().min(10).required()
        });
        validateRequest(req, next, update_schema);
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