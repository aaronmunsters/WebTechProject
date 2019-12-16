'use strict'
/*
*   VALIDATION: COMMENT
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating/updating a comment entry
*
*/
const joi = require('@hapi/joi');

const createValidation = data => {

    const schema = joi.object({
        
        author:         joi
                        .string()
                        .required(),

        content:        joi
                        .string()
                        .required(),

        component:      joi
                        .string()
                        .required()
    });
    return schema.validate(data)
}

const updateValidation = data => {

    const schema = joi.object({
               
        author:         joi
                        .string(),

        content:        joi
                        .string(),

        component:      joi
                        .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation