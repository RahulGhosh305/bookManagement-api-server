const { pick } = require('lodash');
const Joi = require('joi');
const httpStatus = require("http-status");
const apiResponse = require("../utils/apiResponse");

const validate = (schema) => async (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object, { abortEarly: false });

    if (error) {
        const err = {};
        await error.details.forEach(e => {
            err[e.path[1]] = e.message.toString();
        });
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Error" }, err)
    }


    Object.assign(req, value);
    return next();
};

module.exports = { validate };