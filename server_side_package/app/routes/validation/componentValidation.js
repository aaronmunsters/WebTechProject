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
        
        type:           joi
                        .string()
                        .required(),

        content:        joi
                        .string()
                        .required(),

        pages:          joi
                        .string()
                        .required(),

        description:    joi
                        .string()
                        .required(),

        comments:       joi
                        .string()
                        .required(),

        commentable:    joi
                        .number()
                        .required()
    });
    return schema.validate(data)
}

const updateValidation = data => {

    const schema = joi.object({
        
        title:          joi
                        .string(),
        
        type:           joi
                        .string(),

        content:        joi
                        .string(),

        pages:          joi
                        .string(),

        description:    joi
                        .string(),

        comments:       joi
                        .string(),

        commentable:    joi
                        .number()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation