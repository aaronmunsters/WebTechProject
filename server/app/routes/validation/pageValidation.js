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
                        .string()
                        .required(),
        
        compsM:          joi
                        .string()
                        .required(),

        compsR:          joi
                        .string()
                        .required(),

        url:            joi
                        .string()
                        .required(),

        layout:         joi
                        .string()
                        .required(),

        description:    joi
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
                        .string(),
        
        compsM:          joi
                        .string(),

        compsR:          joi
                        .string(),

        url:            joi
                        .string(),

        layout:         joi
                        .string(),

        description:    joi
                        .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation