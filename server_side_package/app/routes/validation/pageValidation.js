'use strict'
/*
*   VALIDATION: PAGE
*
*   In this file functions are defined that uses the joi package to
*   check if a given data object has the required input
*   for creating/updating a page entry
*
*/
const joi = require('@hapi/joi');

const createValidation = data => {

    const schema = joi.object({
        title:          joi
                        .string()
                        .required(),

        published:      joi
                        .number()
                        .required(),

        compsL:          joi
                        .object()
                        .required(),
        
        compsM:          joi
                        .object()
                        .required(),

        compsR:          joi
                        .object()
                        .required(),

        url:            joi
                        .string()
                        .required(),

        layout:         joi
                        .string()
                        .required()
    });
    return schema.validate(data)
}

const updateValidation = data => {

    const schema = joi.object({
        title:          joi
                        .string(),

        published:      joi
                        .number(),

        compsL:          joi
                        .object(),
        
        compsM:          joi
                        .object(),

        compsR:          joi
                        .object(),

        url:            joi
                        .string()
                        .required(),

        layout:         joi
                        .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation