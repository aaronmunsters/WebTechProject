'use strict'
/*
*   VALIDATION: COMPONENT
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating/updating a component entry
*
*/
const joi = require('@hapi/joi');

const createValidation = data => {

    const schema = joi.object({
        
        title:          joi
                        .string()
                        .required(),

        tags:           joi
                        .object
                        .required(),
        
        type:           joi
                        .string()
                        .required(),

        content:        joi
                        .object()
                        .required(),

        pages:          joi
                        .object()
                        .required()
    });
    return schema.validate(data)
}

const updateValidation = data => {

    const schema = joi.object({
        
        title:          joi
                        .string(),

        tags:           joi
                        .object,
        
        type:           joi
                        .string(),

        content:        joi
                        .object(),

        pages:          joi
                        .object()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation